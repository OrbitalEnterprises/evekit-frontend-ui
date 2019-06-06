import {Component, Inject} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {DialogsService} from '../../../platform/dialogs.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {EligibleAccount} from './eligible-account';
import {AccountService, AdminService, EveKitUserAccount, SynchronizedEveAccount} from '../../../platform-service-api';
import {MonitoredChar} from '../monitored-char';

export const APP_CHAR_LIST_PROP = 'appSkillMonAccounts';

const REQUIRED_SCOPES = [
  'esi-clones.read_implants.v1',
  'esi-skills.read_skills.v1',
  'esi-skills.read_skillqueue.v1',
  'esi-wallet.read_character_wallet.v1'
];

const REQUIRED_MASKS = [
  'ACCESS_ACCOUNT_BALANCE',
  'ACCESS_CHARACTER_SHEET',
  'ACCESS_SKILL_QUEUE'
];

@Component({
  selector: 'app-select-character-dialog',
  templateUrl: './select-character-dialog.component.html',
  styleUrls: ['./select-character-dialog.component.css'],
  providers: []
})
export class SelectCharacterDialogComponent {
  user: EveKitUserAccount = null;
  current: Array<MonitoredChar> = [];
  eligible: Array<EligibleAccount> = [];
  selectedChars: FormArray = new FormArray([]);
  formModel: FormGroup = new FormGroup({
    eligibleChars: this.selectedChars
  });

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              private dialogRef: MatDialogRef<SelectCharacterDialogComponent>,
              private dialogService: DialogsService,
              private adminService: AdminService,
              private acctService: AccountService) {
    // Caller will pass in list of current selected accounts.  We'll filter these
    // from the eligible list.
    this.user = data['user'];
    this.current = data['monitored'];
    this.acctService.getSyncAccount(-1, -1).subscribe(
      acctList => {
        // Filter received account list against existing accounts
        const eligibleAccounts: Array<SynchronizedEveAccount> = [];
        filterEligible: for (const next of acctList) {
          const nextAID = next.aid;
          // Verify has required scopes
          const scopeList = next.scopes.split(' ');
          for (const s of REQUIRED_SCOPES) {
            let found = false;
            for (const ns of scopeList) {
              if (ns === s) {
                found = true;
                break;
              }
            }
            if (!found) {
              continue filterEligible;
            }
          }
          // Verify not already selected
          for (const e of this.current) {
            if (e.aid === nextAID) {
              continue filterEligible;
            }
          }
          eligibleAccounts.push(next);
        }

        // Retrieve access keys for all eligible accounts and filter
        for (const next of eligibleAccounts) {
          acctService.getAccessKey(-1, next.aid, -1).subscribe(
            keyList => {
              // Setup first key with required access constants
              filterKeys: for (const nextKey of keyList) {
                for (const nextMask of REQUIRED_MASKS) {
                  let found = false;
                  for (const nextSet of nextKey.maskValueString.split('|')) {
                    if (nextSet === nextMask) {
                      found = true;
                      break;
                    }
                  }
                  if (!found) {
                    continue filterKeys;
                  }
                }
                // Found a key, add it and break the loop
                this.eligible.push(new EligibleAccount(next, nextKey));
                this.selectedChars.push(new FormControl(false));
                break;
              }
            },
            () => {
              this.dialogService.makeWarnDialog('Access Key Error',
                'Unable to retrieve some access keys.  Attempting to continue but some accounts may not be visible.  ' +
                'Cancel the \'add account\' dialog and re-open to try again.');
            }
          );
        }
      },
      () => {
        this.dialogService.makeWarnDialog('Account List Error',
          'Unable to retrieve synchronized account list.  Cancel the \'add account\' dialog and re-open to try again.');
      }
    );
  }

  save(): void {
    // Extract selected permissions
    const startLength = this.current.length;
    for (let i = 0; i < this.eligible.length; i++) {
      if (this.selectedChars.controls[i].value) {
        const newChar = {
          'aid': this.eligible[i].account.aid,
          'kid': this.eligible[i].access.kid
        };
        this.current.push(new MonitoredChar(newChar));
      }
    }

    // Update if necessary
    if (this.current.length !== startLength) {
      this.adminService.setUserProp(parseInt(this.user.uid, 10), APP_CHAR_LIST_PROP, JSON.stringify(this.current))
        .subscribe(
          () => {
            this.dialogRef.close(null);
          },
          () => {
            this.dialogService.makeWarnDialog('Save Error',
              'Unable to save selection.  Please try again.  If this problem persists, please contact the site admin.');
          }
        );
    } else {
      this.dialogRef.close(null);
    }
  }

  cancel(): void {
    this.dialogRef.close(null);
  }

}
