import {Component, DoCheck, OnDestroy} from '@angular/core';
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
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-skill-mon-main',
  templateUrl: './skill-mon-main.component.html',
  styleUrls: ['./skill-mon-main.component.css']
})
export class SkillMonMainComponent implements OnDestroy, DoCheck {
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
  loading = false;

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

  ngDoCheck(): void {
    this.setTabFromURL();
  }

  setTabFromURL(): void {
    const params = this.router.parseUrl(this.location.path()).queryParams;
    if (params['tab']) {
      const target = parseInt(params['tab'], 10);
      if (this.selectedTab !== target) {
        this.selectedTab = target;
      }
    }
  }

  setTabFromRoute(): void {
    // Extract the selected tab
    this.routeInfo.queryParams
      .pipe(filter(params => params.tab))
      .subscribe(
        params => {
          this.selectedTab = parseInt(params.tab, 10);
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
    let side = 0;
    let hide = 0;
    const params = this.router.parseUrl(this.location.path()).queryParams;
    if (params['side']) {
      side = parseInt(params['side'], 10);
    }
    if (params['hide']) {
      hide = parseInt(params['hide'], 10);
    }

    const url = this
      .router
      .createUrlTree(['/apps/skillmon'],
        {
          queryParams: {'tab': event.index, 'side': side, 'hide': hide}, relativeTo: this.routeInfo
        })
      .toString();

    this.location.go(url);
  }

  startMonitorRefresh(): void {
    // Retrieve account list
    this.uidListener = this.store.pipe(select(selectUserAccount)).subscribe(
      u => {
        this.user = u;
        if (u === null) {
          // User logged out, reroute
          this.router.navigateByUrl('/');
          return;
        }
        this.refreshMonitorList();
      }
    );
  }

  refreshMonitorList(): void {
    this.refreshTimer = 299;
    if (this.user === null) {
      return;
    }
    this.loading = true;
    this.adminService.getUserProp(parseInt(this.user.uid, 10), APP_CHAR_LIST_PROP)
      .subscribe(
        property => {
          // Retrieve and store monitored list
          this.monitorList = [];
          this.monitoredNames.clear();
          const monList = JSON.parse(property.propertyValue);
          if (monList === null) {
            this.loading = false;
            return;
          }
          for (const next of monList) {
            this.monitorList.push(new MonitoredChar(next));
          }
          // Now that we have a list of monitored chars we can honor any pre-selection in the route
          this.setTabFromRoute();
          // Resolve names of monitored characters for convenience
          const requests: Array<Observable<SynchronizedEveAccount[]>> = [];
          for (const next of this.monitorList) {
            requests.push(this.accountService.getSyncAccount(-1, next.aid));
          }
          forkJoin(requests).subscribe(
            answers => {
              for (let i = 0; i < answers.length; i++) {
                const answerList = answers[i];
                if (answerList.length === 1) {
                  this.monitoredNames.set(answerList[0].aid, answerList[0]);
                } else {
                  // Requested account missing, remove from monitor list.
                  // TODO - save the new list.
                  this.monitorList.splice(i, 1);
                }
              }
              this.loading = false;
            },
            () => {
              this.loading = false;
              this.dialogService.makeWarnDialog('User Configuration Error',
                'Unable to read list of monitored accounts.  Please verify you are logged in a reload the page.');
            }
          );
        },
        () => {
          this.loading = false;
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

  removeCharacter(target: MonitoredChar): void {
    if (!this.monitoredNames.has(target.aid)) {
      // Stale reference, kick off a reload.
      this.refreshMonitorList();
      return;
    }
    const acctInfo = this.monitoredNames.get(target.aid);
    this.dialogService.makeConfirmDialog('Confirm Remove', 'Are you sure you want to remove \'' + acctInfo.eveCharacterName + '\'?')
      .afterClosed().subscribe(
      confirm => {
        if (confirm) {
          // Remove this account, save the property and refresh.
          const newList = [];
          for (const next of this.monitorList) {
            if (next.aid === target.aid && next.kid === target.kid) {
              continue;
            }
            newList.push({'aid': next.aid, 'kid': next.kid});
          }
          this.adminService.setUserProp(parseInt(this.user.uid, 10), APP_CHAR_LIST_PROP, JSON.stringify(newList))
            .subscribe(
              () => {
                this.refreshMonitorList();
              },
              () => {
                this.dialogService.makeWarnDialog('Property Save Error',
                  'Unable to save new monitored account list.  Please try again.  If this problem persists, ' +
                  'please contact the site admin.');
              }
            );
        }
      }
    );
  }

  buildSkillTree(): void {
    this.loading = true;
    this.invSDEService.getGroups(-1, 1000, undefined, undefined, undefined, '{values:[16]}')
      .subscribe(
        results => {
          // Set list of skill groups
          const getSkillLists: Array<Observable<InvType[]>> = [];
          for (const next of results) {
            if (next.groupID === 505) {
              // Ignore fake skills group
              continue;
            }
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
                      this.loading = false;
                      this.startMonitorRefresh();
                    },
                    () => {
                      this.loading = false;
                      this.dialogService.makeWarnDialog('Skill Tree Error',
                        'Unable to construct skill tree.  Please reload the page to try again.  If this problem persists, please ' +
                        'contact the administrator.');
                    }
                  );
              },
              () => {
                this.loading = false;
                this.dialogService.makeWarnDialog('Skill Tree Error',
                  'Unable to construct skill tree.  Please reload the page to try again.  If this problem persists, please ' +
                  'contact the administrator.');
              }
            );
        },
        () => {
          this.loading = false;
          this.dialogService.makeWarnDialog('Skill Tree Error',
            'Unable to construct skill tree.  Please reload the page to try again.  If this problem persists, please ' +
            'contact the administrator.');
        }
      );
  }


}
