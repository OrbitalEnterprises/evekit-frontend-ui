import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppState} from '../../../store/store-model';
import {Store} from '@ngrx/store';
import {AccountService, AccountV2Service, CredentialService, SynchronizedEveAccount} from '../../../platform-service-api';
import {CharacterInfo, fetchCharacterInfo, mapAlliance, mapAncestry, mapBloodline, mapFaction, mapRace} from './char-info';
import {HttpClient} from '@angular/common/http';
import {CorporationInfo, fetchCorporationInfo, mapStation} from './corp-info';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {SDECharacterService, SDEStationService} from '../../../sde-service-api';
import {selectSyncAccounts} from '../../../platform/selectors';
import {
  faBirthdayCake,
  faChartLine,
  faChild,
  faGlobe,
  faHandRock,
  faHandshake,
  faPercent,
  faSignInAlt,
  faSyringe,
  faTicketAlt,
  faUsers,
  faUserSecret,
  faUserTie,
  faVenusMars,
  faVial
} from '@fortawesome/free-solid-svg-icons';
import {DialogsService} from '../../../platform/dialogs.service';
import {refreshSyncAccounts} from '../../../platform/version/account-tools';
import {MatDialog} from '@angular/material';
import {EditAccountNameDialogComponent} from './edit-account-name-dialog/edit-account-name-dialog.component';
import {EditEsiTokenDialogComponent} from '../../../edit-esi-token/edit-esi-token-dialog/edit-esi-token-dialog.component';
import {ViewScopesDialogComponent} from './view-scopes-dialog/view-scopes-dialog.component';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css', '../accounts-view.component.css']
})
export class SummaryComponent implements OnDestroy {
  aid: Observable<number>;
  aidWatcher: Subscription = null;
  account: SynchronizedEveAccount = null;
  charInfo: CharacterInfo;
  corpInfo: CorporationInfo;
  race: string;
  bloodline: string;
  ancestry: string;
  charAlliance: string;
  charFaction: string;
  ceo: string;
  station: string;
  corpAlliance: string;
  corpFaction: string;

  // icons
  attrGender = faVenusMars;
  attrCEO = faUserTie;
  attrRace = faChild;
  attrBloodline = faSyringe;
  attrAncestry = faVial;
  attrTicker = faChartLine;
  attrBirthday = faBirthdayCake;
  attrMembers = faUsers;
  attrShares = faTicketAlt;
  attrSecStatus = faUserSecret;
  attrAlliance = faHandshake;
  attrFaction = faHandRock;
  attrTaxes = faPercent;
  attrStation = faGlobe;
  icSignIn = faSignInAlt;

  constructor(private routeInfo: ActivatedRoute,
              private store: Store<AppState>,
              private httpClient: HttpClient,
              private charService: SDECharacterService,
              private stationService: SDEStationService,
              private acctService: AccountV2Service,
              private adminService: AccountService,
              private router: Router,
              private dialog: MatDialog,
              private credsService: CredentialService,
              private dialogService: DialogsService) {

    // Setup tracking of account ID from params
    this.aid = this.routeInfo.paramMap.pipe(map(
      mm => {
        return parseInt(mm.get('aid'), 10);
      }
    ));

    // Match the account when the aid changes, then reload everything
    this.aid.subscribe(
      aid => {
        if (this.account === null || aid !== this.account.aid) {
          // New aid, refresh everything.
          if (this.aidWatcher !== null) {
            this.aidWatcher.unsubscribe();
            this.aidWatcher = null;
          }
        }

        if (this.aidWatcher === null) {
          // Setup our aid watcher.  This subscription will observe every sync
          // account change and trigger reloads on appropriate actions.
          this.aidWatcher = this.store.select(selectSyncAccounts)
            .subscribe(
              acctList => {
                this.account = null;
                for (const acct of acctList) {
                  if (acct.aid === aid) {
                    this.account = acct;
                  }
                }
                if (this.account === null) {
                  // Perhaps navigated here by mistake, reroute to /info
                  // noinspection JSIgnoredPromiseFromCall
                  this.router.navigate(['/info']);
                } else {
                  this.reloadInfo();
                }
              });
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.aidWatcher !== null) {
      this.aidWatcher.unsubscribe();
      this.aidWatcher = null;
    }
  }

  reloadInfo(): void {
    // Load Character and Corporation info
    if (this.account.eveCharacterID !== -1) {
      fetchCharacterInfo(this.httpClient, this.account.eveCharacterID)
        .subscribe(
          cinfo => {
            this.charInfo = cinfo;
            this.reloadCharacterInfoMap();
          },
          () => {
            this.dialogService.displayGenericUserError('Unable to Retrieve Character Info', 'Failed to retrieve character info');
          }
        );
      fetchCorporationInfo(this.httpClient, this.account.eveCorporationID)
        .subscribe(
          cinfo => {
            this.corpInfo = cinfo;
            this.reloadCorporationInfoMap();
          },
          () => {
            this.dialogService.displayGenericUserError('Unable to Retrieve Corporation Info', 'Failed to retrieve corporation info');
          }
        );
    }
  }

  reloadCharacterInfoMap(): void {
    mapRace(this.charInfo.race_id, this.charService)
      .subscribe(
        raceName => {
          this.race = raceName;
        },
        () => {
          this.dialogService.displayGenericUserError('Unable to Retrieve Race Info', 'Failed to retrieve Race info');
        }
      );
    mapBloodline(this.charInfo.bloodline_id, this.charService)
      .subscribe(
        bloodlineName => {
          this.bloodline = bloodlineName;
        },
        () => {
          this.dialogService.displayGenericUserError('Unable to Retrieve Bloodline Info', 'Failed to retrieve bloodline info');
        }
      );
    if (this.charInfo.ancestry_id > 0) {
      mapAncestry(this.charInfo.ancestry_id, this.charService)
        .subscribe(
          ancestryName => {
            this.ancestry = ancestryName;
          },
          () => {
            this.dialogService.displayGenericUserError('Unable to Retrieve Ancestry Info', 'Failed to retrieve ancestry info');
          }
        );
    } else {
      this.ancestry = 'N/A';
    }
    if (this.charInfo.faction_id > 0) {
      mapFaction(this.charInfo.faction_id, this.charService)
        .subscribe(
          factionName => {
            this.charFaction = factionName;
          },
          () => {
            this.dialogService.displayGenericUserError('Unable to Retrieve Character Faction Info',
              'Failed to retrieve character faction info');
          }
        );
    } else {
      this.charFaction = 'N/A';
    }
    if (this.charInfo.alliance_id > 0) {
      mapAlliance(this.httpClient, this.charInfo.alliance_id)
        .subscribe(
          allianceName => {
            this.charAlliance = allianceName;
          },
          () => {
            this.dialogService.displayGenericUserError('Unable to Retrieve Character Alliance Info',
              'Failed to retrieve character alliance info');
          }
        );
    } else {
      this.charAlliance = 'N/A';
    }
  }

  reloadCorporationInfoMap(): void {
    fetchCharacterInfo(this.httpClient, this.corpInfo.ceo_id)
      .subscribe(
        cinfo => {
          this.ceo = cinfo.name;
        },
        () => {
          this.dialogService.displayGenericUserError('Unable to Retrieve Corporation CEO Info', 'Failed to retrieve corporation CEO info');
        }
      );
    if (this.corpInfo.home_station_id > 0) {
      if (this.corpInfo.home_station_id >= 60000000 &&
        this.corpInfo.home_station_id <= 64000000) {
        mapStation(this.corpInfo.home_station_id, this.stationService)
          .subscribe(
            stationName => {
              this.station = stationName;
            },
            () => {
              this.dialogService.displayGenericUserError('Unable to Retrieve Home Station Info', 'Failed to retrieve home station info');
            }
          );
      } else {
        this.station = 'Not Public';
      }
    } else {
      this.station = 'N/A';
    }
    // map home station
    if (this.corpInfo.faction_id > 0) {
      mapFaction(this.corpInfo.faction_id, this.charService)
        .subscribe(
          factionName => {
            this.corpFaction = factionName;
          },
          () => {
            this.dialogService.displayGenericUserError('Unable to Retrieve Corporation Faction Info',
              'Failed to retrieve corporation faction info');
          }
        );
    } else {
      this.corpFaction = 'N/A';
    }
    if (this.corpInfo.alliance_id > 0) {
      mapAlliance(this.httpClient, this.corpInfo.alliance_id)
        .subscribe(
          allianceName => {
            this.corpAlliance = allianceName;
          },
          () => {
            this.dialogService.displayGenericUserError('Unable to Retrieve Corporation Alliance Info',
              'Failed to retrieve corporation alliance info');
          }
        );
    } else {
      this.corpAlliance = 'N/A';
    }
  }

  markForDelete(): void {
    const dialogRef = this.dialogService.makeConfirmDialog('Delete Account',
      `Are you sure you want to mark this account for removal?  (Becomes permanent in 24 hours.)`);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.adminService.deleteSyncAccount(-1, this.account.aid)
          .subscribe(
            () => {
              // On success, force a reload of all sync accounts
              refreshSyncAccounts(this.account.userAccount, this.adminService, this.store);
            },
            () => {
              this.dialogService.displayGenericUserError('Unable to Mark Account', 'Failed to mark account for deletion');
            }
          );
      }
    });
  }

  unmarkForDelete(): void {
    this.adminService.restoreSyncAccount(-1, this.account.aid)
      .subscribe(
        () => {
          // On success, force a reload of all sync accounts
          refreshSyncAccounts(this.account.userAccount, this.adminService, this.store);
        },
        () => {
          this.dialogService.displayGenericUserError('Unable to Restore Account', 'Failed to restore account marked for removal');
        }
      );
  }

  openAccountNameDialog(): void {
    this.dialog.open(EditAccountNameDialogComponent,
      {
        data: {
          'currentName': this.account.name,
          'currentAID': this.account.aid,
          'currentType': this.account.characterType
        }
      });
  }

  openAddESITokenDialog(): void {
    this.dialog.open(EditEsiTokenDialogComponent,
      {
        data: {
          'editMode': 'Add',
          'account': this.account
        }
      });
  }

  openEditESITokenDialog(): void {
    this.dialog.open(EditEsiTokenDialogComponent,
      {
        data: {
          'editMode': 'Edit',
          'account': this.account
        }
      });
  }

  viewScopesDialog(): void {
    this.dialog.open(ViewScopesDialogComponent,
      {
        data: this.account
      });
  }

  reauthorizeESIToken(): void {
    // UI should normally prevent this, but just in case...
    if (this.account.scopes === null || this.account.scopes.length === 0) {
      return;
    }

    this.credsService.setESICredential(this.account.aid, this.account.scopes)
      .subscribe(
        result => {
          // Redirect to authorize change
          window.location.assign(result['newLocation']);
        },
        () => {
          // Error
          this.dialogService.displayGenericUserError(`Reauthorize ESI Token Failed`,
            'Failed to reauthorize ESI token')
            .afterClosed().subscribe(
            () => {
              refreshSyncAccounts(this.account.userAccount, this.adminService, this.store);
            }
          );
        }
      );
  }

  removeESITokenDialog(): void {
    // UI should normally prevent this, but just in case...
    if (this.account.scopes === null || this.account.scopes.length === 0) {
      return;
    }

    // Confirm, then delete.
    const dialogRef = this.dialogService.makeConfirmDialog('Delete ESI Token',
      `Are you sure you want to delete the ESI token?`);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.credsService.clearESICredential(this.account.aid)
          .subscribe(
            () => {
              // On success, force a reload of all sync accounts
              refreshSyncAccounts(this.account.userAccount, this.adminService, this.store);
            },
            () => {
              this.dialogService.displayGenericUserError('Delete ESI Token Failed',
                'Failed to delete ESI token')
                .afterClosed().subscribe();
            }
          );
      }
    });
  }

}
