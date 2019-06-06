import {Component} from '@angular/core';
import {Location} from '@angular/common';
import {Observable, of} from 'rxjs';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material';
import {MenuGuard, MenuNode} from './menu-node';
import {FlatMenuNode} from './flat-menu-node';
import {MenuConstructor} from './menu-constructor';
import {SingleMenuNode} from './single-menu-node';
import {FlatSingleMenuNode} from './flat-single-menu-node';
import {ExpandableMenuNode} from './expandable-menu-node';
import {FlatExpandableMenuNode} from './flat-expandable-menu-node';
import {FlatComingSoonMenuNode} from './flat-comingsoon-menu-node';
import {SyncAccountMenuNode} from './sync-account-menu-node';
import {FlatSyncAccountMenuNode} from './flat-sync-account-menu-node';
import {NavigationEnd, Router} from '@angular/router';
import {CallbackMenuNode} from './callback-menu-node';
import {FlatCallbackMenuNode} from './flat-callback-menu-node';
import {FlatExternalMenuNode} from './flat-external-menu-node';

// noinspection UnterminatedStatementJS
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [MenuConstructor]
})
export class MenuComponent {
  treeControl: FlatTreeControl<FlatMenuNode>;
  treeFlattener: MatTreeFlattener<MenuNode, FlatMenuNode>;
  dataSource: MatTreeFlatDataSource<MenuNode, FlatMenuNode>;
  activeRoute: string = null;

  constructor(database: MenuConstructor,
              public location: Location,
              public router: Router) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this._getLevel,
      this._isExpandable, this._getChildren);
    this.treeControl = new FlatTreeControl<FlatMenuNode>(this._getLevel, this._isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    // Setup updates on menu item changes
    database.dataChange.subscribe(data => {
      this.dataSource.data = data;
      // Changing data source will force a redraw, make sure we fix expansion after the redraw
      setTimeout(() => {
        this.updateExpansion();
      }, 10);
    });

    // Subscribe to route changes so we can properly highlight the selected menu item
    router.events.subscribe(routeEvent => {
      if (routeEvent instanceof NavigationEnd) {
        this.updateExpansion();
      }
    });
  }

  updateExpansion(): void {
    if (this.location.path() !== null) {
      this.activeRoute = this.location.path();

      // Remove any trailing query text
      if (this.activeRoute.indexOf('?') >= 0) {
        this.activeRoute = this.activeRoute.substring(0, this.activeRoute.indexOf('?'));
      }

      // Ensure selected menu item is visible based on route
      const expandCheck: number[] = [];
      const nodeList = this.treeControl.dataNodes;
      for (let i = 0; i < nodeList.length; i++) {
        const next = nodeList[i];
        if (next.level === 0) {
          expandCheck.push(i);
        }
        while (expandCheck.length > 0) {
          const j: number = expandCheck.pop();
          if (this.hasSelectedChild(nodeList, j)) {
            const level = nodeList[j].level;
            this.treeControl.expand(nodeList[j]);
            for (let k = j + 1; k < nodeList.length && nodeList[k].level > level; k++) {
              if (nodeList[k].level === level + 1) {
                expandCheck.push(k);
              }
            }
          }
        }
      }
    }
  }

  transformer = (node: MenuNode, level: number): FlatMenuNode => {
    const comingSoon = node.guards.indexOf(MenuGuard.COMING_SOON) > -1;
    const external = node.guards.indexOf(MenuGuard.EXTERNAL) > -1;
    if (node instanceof SingleMenuNode) {
      if (comingSoon) {
        return new FlatComingSoonMenuNode(level, node.name, node.icon, node.img);
      } else if (external) {
        return new FlatExternalMenuNode(level, node.name, node.icon, node.img, node.route);
      } else {
        return new FlatSingleMenuNode(level, node.name, node.route, node.icon, node.img);
      }
    } else if (node instanceof CallbackMenuNode) {
      if (comingSoon) {
        return new FlatComingSoonMenuNode(level, node.name, node.icon, node.img);
      } else {
        return new FlatCallbackMenuNode(level, node.name, node.callback, node.icon, node.img);
      }
    } else if (node instanceof ExpandableMenuNode) {
      if (comingSoon) {
        return new FlatComingSoonMenuNode(level, node.name, node.icon, node.img);
      } else {
        return new FlatExpandableMenuNode(level, node.name, node.icon, node.img);
      }
    } else if (node instanceof SyncAccountMenuNode) {
      return new FlatSyncAccountMenuNode(level, node.name, node.route, node.img, node.aid, node.charType);
    } else {
      return new FlatMenuNode(level, node.dynamicChildren.length > 0);
    }
  };

  openExternal(node: FlatExternalMenuNode): void {
    window.open(node.url, '_blank');
  }

  generateRoute(node: FlatMenuNode): any[] {
    if (node instanceof FlatSyncAccountMenuNode) {
      return [node.route, node.aid];
    }
    if (node instanceof FlatSingleMenuNode) {
      return [node.route];
    }
    throw new Error('Routing not supported for menu node: ' + String(node));
  }

  getRouteName(node: FlatMenuNode): string {
    if (node instanceof FlatSyncAccountMenuNode) {
      return node.route + '/' + String(node.aid);
    } else if (node instanceof FlatExternalMenuNode) {
      return 'not_needed';
    } else if (node instanceof FlatSingleMenuNode) {
      // Handle model api specially since selected key routes borrow the same menu entry.
      if (node.route.startsWith('/sapi/model/') && this.activeRoute.startsWith('/sapi/model/')) {
        return this.activeRoute;
      }
      return node.route;
    } else {
      throw new Error('Route name not supported for menu node: ' + String(node));
    }
  }

  generateRouteClass(node: FlatMenuNode): string {
    if (this.getRouteName(node) === this.activeRoute) {
      return 'selected-menu';
    } else {
      return 'hover-menu';
    }
  }

  hasSelectedChild(node: FlatMenuNode[], index: number): boolean {
    const check = node[index];
    // Callback nodes can never be selected
    if (check instanceof FlatCallbackMenuNode) {
      return false;
    }
    // If this is a leaf, check the route.
    if (check instanceof FlatSyncAccountMenuNode || check instanceof FlatSingleMenuNode) {
      const routeName = this.getRouteName(check);
      return routeName === this.activeRoute;
    }
    // If this node is not expandable or is the last node, then can't have a selected child.
    if (!check.expandable || index + 1 >= node.length) {
      return false;
    }
    const level = check.level;
    for (let i = index + 1; i < node.length && node[i].level > level; i++) {
      if ((node[i].level === level + 1) && this.hasSelectedChild(node, i)) {
        return true;
      }
    }
    return false;
  }

  private _getLevel = (node: FlatMenuNode) => node.level;

  private _isExpandable = (node: FlatMenuNode) => node.expandable;

  private _getChildren = (node: MenuNode): Observable<MenuNode[]> => of(node.dynamicChildren);

  hasChild = (_: number, _nodeData: FlatMenuNode) => _nodeData.expandable;

  isFlatSingleMenuNode = (_: number, _nodeData: FlatMenuNode) => _nodeData instanceof FlatSingleMenuNode;

  isFlatComingSoonMenuNode = (_: number, _nodeData: FlatMenuNode) => _nodeData instanceof FlatComingSoonMenuNode;

  isFlatExternalMenuNode = (_: number, _nodeData: FlatMenuNode) => _nodeData instanceof FlatExternalMenuNode;

  isFlatSyncAccountMenuNode = (_: number, _nodeData: FlatMenuNode) => _nodeData instanceof FlatSyncAccountMenuNode;

  isFlatCallbackMenuNode = (_: number, _nodeData: FlatMenuNode) => _nodeData instanceof FlatCallbackMenuNode;

}
