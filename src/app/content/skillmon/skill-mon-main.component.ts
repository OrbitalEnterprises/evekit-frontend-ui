import {Component, OnChanges, OnDestroy} from '@angular/core';
import {Location} from '@angular/common';
import {MonitoredChar} from './monitored-char';
import {AccountService, AdminService, EveKitUserAccount, SynchronizedEveAccount} from '../../platform-service-api';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../store/store-model';
import {selectUserAccount} from '../../platform/selectors';
import {forkJoin, Observable, Subscription, timer} from 'rxjs';
import {MatDialog, MatTabChangeEvent} from '@angular/material';
import {APP_CHAR_LIST_PROP, SelectCharacterDialogComponent} from './select-character-dialog/select-character-dialog.component';
import {SkillGroup} from './skill-mon-character-view/skill-group';
import {InvType, SDEDogmaService, SDEInventoryService} from '../../sde-service-api';
import {SkillTree} from './skill-mon-character-view/skill-tree';
import {DialogsService} from '../../platform/dialogs.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-skill-mon-main',
  templateUrl: './skill-mon-main.component.html',
  styleUrls: ['./skill-mon-main.component.css']
})
export class SkillMonMainComponent implements OnDestroy {
  uidListener: Subscription = null;
  user: EveKitUserAccount = null;
  monitorList: Array<MonitoredChar> = [];
  monitoredNames: Map<number, SynchronizedEveAccount> = new Map();
  secondTimer: Observable<number>;
  finalSkillTree: SkillTree = null;
  skillTree: SkillTree = new SkillTree();
  selectedTab = 0;
  refreshTimer = 299;
  timerUpdate: Subscription = null;

  constructor(private router: Router,
              private location: Location,
              private routeInfo: ActivatedRoute,
              private store: Store<AppState>,
              private dialog: MatDialog,
              private accountService: AccountService,
              private adminService: AdminService,
              private dialogService: DialogsService,
              private invSDEService: SDEInventoryService,
              private dogmaSDEService: SDEDogmaService) {
    // Set up second timer
    this.secondTimer = timer(1000, 1000);
    // Get the skill tree
    this.buildSkillTree();
    // Set up refresh timer
    this.secondTimer.subscribe(() => this.updateRefreshTimer());
  }

  ngOnDestroy(): void {
    if (this.uidListener != null) {
      this.uidListener.unsubscribe();
    }
    if (this.timerUpdate != null) {
      this.timerUpdate.unsubscribe();
    }
  }

  setTabFromRoute(): void {
    // Extract the selected tab
    this.routeInfo.paramMap.subscribe(
      next => {
        const tab = next.get('tab');
        if (tab) {
          this.selectedTab = parseInt(tab, 10);
        }
      }
    );
  }

  updateRefreshTimer() {
    this.refreshTimer -= 1;
    if (this.refreshTimer < 0) {
      this.refreshMonitorList();
    }
  }

  updateRoute(event: MatTabChangeEvent): void {
    const url = this
      .router
      .createUrlTree(['/apps/skillmon', event.index], {relativeTo: this.routeInfo})
      .toString();

    this.location.go(url);
  }

  startMonitoRefresh(): void {
    // Retrieve account list
    this.uidListener = this.store.pipe(select(selectUserAccount)).subscribe(
      u => {
        this.user = u;
        this.refreshMonitorList();
      }
    );
  }

  refreshMonitorList(): void {
    this.refreshTimer = 299;
    this.adminService.getUserProp(parseInt(this.user.uid, 10), APP_CHAR_LIST_PROP)
      .subscribe(
        property => {
          // Retrieve and store monitored list
          this.monitorList = [];
          this.monitoredNames.clear();
          const monList = JSON.parse(property.propertyValue);
          if (monList === null) {
            return;
          }
          for (const next of monList) {
            this.monitorList.push(new MonitoredChar(next));
          }
          // Now that we have a list of monitored chars we can honor any pre-selection in the route
          this.setTabFromRoute();
          // Resolve names of monitored characters for convenience
          for (const next of this.monitorList) {
            this.accountService.getSyncAccount(-1, next.aid)
              .subscribe(
                info => {
                  if (info.length === 1) {
                    this.monitoredNames.set(info[0].aid, info[0]);
                  } else {
                    // TODO - error if 0
                  }
                },
                () => {
                  // TODO - error
                }
              );
          }
          // TODO: eliminate any chars that are no longer valid.
        },
        () => {
          this.dialogService.makeWarnDialog('User Configuration Error',
            'Unable to read account configuration.  Please verify you are logged in a reload the page.');
        }
      );
  }

  addCharactersDialog(): void {
    this.dialog.open(SelectCharacterDialogComponent,
      {
        data: {
          'user': this.user,
          'monitored': this.monitorList
        }
      }).afterClosed().subscribe(
      () => {
        this.refreshMonitorList();
      }
    );
  }

  buildSkillTree(): void {
    this.invSDEService.getGroups(-1, 1000, undefined, undefined, undefined, '{values:[16]}')
      .subscribe(
        results => {
          // Set list of skill groups
          const getSkillLists: Array<Observable<InvType[]>> = [];
          for (const next of results) {
            this.skillTree.skillGroups.set(next.groupID, new SkillGroup(next.groupID, next.groupName, []));
            getSkillLists.push(this.invSDEService.getTypes(-1, 1000, undefined, undefined,
              undefined, undefined, undefined, undefined,
              '{values:[' + String(next.groupID) + ']}'));
          }
          // Now retrieve list of skills for each group and set
          forkJoin(getSkillLists)
            .subscribe(
              skills => {
                for (const next of skills) {
                  for (const nextSkill of next) {
                    this.skillTree.skillGroups.get(nextSkill.groupID).skillList.push(nextSkill.typeID);
                    this.skillTree.skillList.set(nextSkill.typeID, nextSkill);
                  }
                }
                this.finalSkillTree = this.skillTree;
                // Finally, retrieve ranks for all skills
                this.dogmaSDEService.getTypeAttributes(-1, 1000, undefined, '{values:[275]}')
                  .subscribe(
                    rankResults => {
                      for (const next of rankResults) {
                        if (this.skillTree.skillList.has(next.typeID)) {
                          this.skillTree.skillList.get(next.typeID)['rank'] = next.valueFloat;
                        }
                      }
                      // Skill tree ready, start monitor
                      this.startMonitoRefresh();
                    },
                    () => {
                      this.dialogService.makeWarnDialog('Skill Tree Error',
                        'Unable to construct skill tree.  Please reload the page to try again.  If this problem persists, please ' +
                        'contact the administrator.');
                    }
                  );
              },
              () => {
                this.dialogService.makeWarnDialog('Skill Tree Error',
                  'Unable to construct skill tree.  Please reload the page to try again.  If this problem persists, please ' +
                  'contact the administrator.');
              }
            );
        },
        () => {
          this.dialogService.makeWarnDialog('Skill Tree Error',
            'Unable to construct skill tree.  Please reload the page to try again.  If this problem persists, please ' +
            'contact the administrator.');
        }
      );
  }


}
