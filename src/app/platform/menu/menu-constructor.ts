import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {MenuGuard, MenuNode} from './menu-node';
import {SingleMenuNode} from './single-menu-node';
import {ExpandableMenuNode} from './expandable-menu-node';
import {AppState} from '../../store/store-model';
import {Store} from '@ngrx/store';
import {EveKitUserAccount, SynchronizedEveAccount} from '../../platform-service-api';
import {selectSyncAccounts, selectUserAccount} from '../selectors';
import {SyncAccountMenuNode} from './sync-account-menu-node';
import {CallbackMenuNode} from './callback-menu-node';
import {MatDialog} from '@angular/material';
import {CreateSyncAccountComponent} from '../../create-sync-account/create-sync-account/create-sync-account.component';

/**
 * Standard menu layout.  Some elements will be removed depending on login status, etc.
 */
const MENU_STRUCTURE: MenuNode[] = [
  new SingleMenuNode('Info', '/info', 'info', null),
  new ExpandableMenuNode('Accounts', 'people', null)
    .addGuard(MenuGuard.LOGGED_IN),
  new ExpandableMenuNode('APIs', 'code', null)
    .addChild(new SingleMenuNode('Model', '/sapi/model/-1/-1', 'memory', null))
    .addChild(new SingleMenuNode('SDE', '/sapi/sde', 'language', null))
    .addChild(new SingleMenuNode('Market', '/sapi/market', 'bar_chart', null))
    .addChild(new SingleMenuNode('Reference', '/sapi/ref', 'library_books', null)),
  new ExpandableMenuNode('Admin', 'build', null)
    .addGuard(MenuGuard.ADMIN)
    .addChild(new SingleMenuNode('Properties', '/admin/props', 'settings', null))
    .addChild(new SingleMenuNode('Sync Status', '/admin/sync', 'sync', null))
    .addChild(new SingleMenuNode('User List', '/admin/users', 'list', null))
    .addChild(new SingleMenuNode('Notifications', '/admin/notes', 'priority_high', null)),
  new SingleMenuNode('EVA', '/eva', 'chat', null)
    .addGuard(MenuGuard.COMING_SOON),
  new SingleMenuNode('Extension Manager', '/extadmin', 'settings_ethernet', null)
    .addGuard(MenuGuard.COMING_SOON)
    .addGuard(MenuGuard.LOGGED_IN),
  new ExpandableMenuNode('Extensions', 'extension', null)
    .addGuard(MenuGuard.COMING_SOON)
    .addGuard(MenuGuard.LOGGED_IN)
];

/**
 * Construct the display menu.
 */
@Injectable()
export class MenuConstructor {
  account: EveKitUserAccount = null;
  syncAccounts: SynchronizedEveAccount[] = [];
  dataChange: BehaviorSubject<MenuNode[]> = new BehaviorSubject<MenuNode[]>([]);

  constructor(private store: Store<AppState>,
              private dialog: MatDialog) {
    this.accountUpdate(null);
    store.select(selectUserAccount).subscribe(this.accountUpdate);
    store.select(selectSyncAccounts).subscribe(this.syncAccountUpdate);
    // TODO: subscribe to extensions change and update menu
  }

  curryAddNewAccount(): () => void {
    return (function (dialogService: MatDialog) {
      return () => { dialogService.open(CreateSyncAccountComponent); };
    })(this.dialog);
  }

  addNewAccount(): void {
    this.dialog.open(CreateSyncAccountComponent);
  }

  accountUpdate = next => {
    this.account = next;
    this.dataChange.next(this.assembleMenu(MENU_STRUCTURE));
  };

  syncAccountUpdate = next => {
    this.syncAccounts = next;
    const accountNode: ExpandableMenuNode = this.findAccountMenu();
    accountNode.children = [];
    for (const acct of this.syncAccounts) {
      const img = acct.characterType ? '/assets/member.png' : '/assets/corporation.png';
      accountNode.children.push(new SyncAccountMenuNode(acct.name, '/syncaccount', img, acct.aid, acct.characterType));
    }
    accountNode.children.push(new CallbackMenuNode('Add New...', this.curryAddNewAccount(), 'add', null));
    this.dataChange.next(this.assembleMenu(MENU_STRUCTURE));
  };

  findAccountMenu(): ExpandableMenuNode {
    for (const node of MENU_STRUCTURE) {
      if (node instanceof ExpandableMenuNode && node.name === 'Accounts') {
        return node;
      }
    }
    return null;
  }

  unguarded(node: MenuNode): boolean {
    for (const g of node.guards) {
      switch (g) {
        case MenuGuard.ADMIN:
          if (this.account == null || !this.account.admin) {
            return false;
          }
          break;

        case MenuGuard.LOGGED_IN:
          if (this.account == null) {
            return false;
          }
          break;

        case MenuGuard.COMING_SOON:
        default:
          break;
      }
    }
    return true;
  }

  assembleMenu(roots: MenuNode[]): MenuNode[] {
    const data: MenuNode[] = [];
    for (const k of roots) {
      if (!this.unguarded(k)) {
        continue;
      }
      data.push(k);
      if (k.children.length > 0) {
        k.dynamicChildren = this.assembleMenu(k.children);
      } else {
        k.dynamicChildren = [];
      }
    }
    return data;
  }

}

