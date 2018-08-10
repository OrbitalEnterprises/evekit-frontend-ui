import {Component, Inject} from '@angular/core';
import {Store} from '@ngrx/store';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AccountService, EveKitUserAccount, SynchronizedEveAccount} from '../../../../platform-service-api';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AppState} from '../../../../store/store-model';
import {selectSyncAccounts, selectUserAccount} from '../../../../platform/selectors';
import {refreshSyncAccounts} from '../../../../platform/version/account-tools';
import {AccountNameUniqueValidator} from '../../../../create-sync-account/create-sync-account/account-name-unique-validator';
import {first} from 'rxjs/operators';
import {DialogsService} from '../../../../platform/dialogs.service';

@Component({
  selector: 'app-edit-account-name-dialog',
  templateUrl: './edit-account-name-dialog.component.html',
  styleUrls: ['./edit-account-name-dialog.component.css']
})
export class EditAccountNameDialogComponent {
  userAccount: EveKitUserAccount;
  currentName: string;
  currentAID: number;
  currentType: boolean;
  accounts: SynchronizedEveAccount[] = [];
  accountName: FormControl = new FormControl('',
    [Validators.required,
      Validators.minLength(1),
      Validators.maxLength(100),
      Validators.pattern(/[a-zA-Z0-9_]+/g),
      AccountNameUniqueValidator(this.accounts)]);
  formModel: FormGroup = new FormGroup({
    accountName: this.accountName
  });

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              private dialogRef: MatDialogRef<EditAccountNameDialogComponent>,
              private store: Store<AppState>,
              private acctService: AccountService,
              private dialog: DialogsService) {
    this.currentName = data['currentName'];
    this.currentAID = data['currentAID'];
    this.currentType = data['currentType'];
    store.select(selectUserAccount).pipe(first()).subscribe(
      acct => {
        this.userAccount = acct;
      }
    );
    store.select(selectSyncAccounts).pipe(first()).subscribe(
      accts => {
        for (const acct of accts) {
          if (acct.aid !== this.currentAID) {
            this.accounts.push(acct);
          }
        }
      }
    );
  }

  save(): void {
    this.acctService.saveSyncAccount(-1, this.currentAID, this.accountName.value, this.currentType)
      .subscribe(
        () => {
          // Reload sync accounts
          this.dialogRef.close();
          refreshSyncAccounts(this.userAccount, this.acctService, this.store);
        },
        () => {
          // Error
          this.dialogRef.close();
          this.dialog.displayGenericUserError('Change Account Name Failed',
            'Failed to change account name')
            .afterClosed().subscribe(
            () => {
              refreshSyncAccounts(this.userAccount, this.acctService, this.store);
            }
          );
        }
      );
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
