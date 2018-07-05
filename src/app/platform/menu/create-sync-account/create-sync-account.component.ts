import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {AppState} from '../../../store/store-model';
import {Store} from '@ngrx/store';
import {AccountService, EveKitUserAccount, SynchronizedEveAccount} from '../../../platform-service-api';
import {selectSyncAccounts, selectUserAccount} from '../../selectors';
import {AccountNameUniqueValidator} from './account-name-unique-validator';
import {first} from 'rxjs/operators';
import {refreshSyncAccounts} from '../../version/account-tools';
import {DialogsService} from '../../dialogs.service';

@Component({
  selector: 'app-create-sync-account',
  templateUrl: './create-sync-account.component.html',
  styleUrls: ['./create-sync-account.component.css']
})
export class CreateSyncAccountComponent {
  userAccount: EveKitUserAccount;
  accounts: SynchronizedEveAccount[] = [];
  accountName: FormControl = new FormControl('',
    [Validators.required,
      Validators.minLength(1),
      Validators.maxLength(100),
      Validators.pattern(/[a-zA-Z0-9_]+/g),
      AccountNameUniqueValidator(this.accounts)]);
  accountType: FormControl = new FormControl('', Validators.required);
  formModel: FormGroup = new FormGroup({
    accountName: this.accountName,
    accountType: this.accountType
  });

  constructor(private dialogRef: MatDialogRef<CreateSyncAccountComponent>,
              private store: Store<AppState>,
              private acctService: AccountService,
              private dialog: DialogsService) {
    store.select(selectUserAccount).pipe(first()).subscribe(
      acct => {
        this.userAccount = acct;
      }
    );
    store.select(selectSyncAccounts).pipe(first()).subscribe(
      accts => {
        for (const acct of accts) {
          this.accounts.push(acct);
        }
      }
    );
  }

  save(): void {
    this.acctService.saveSyncAccount(-1, -1, this.accountName.value, this.accountType.value === 'CHARACTER')
      .subscribe(
        () => {
          // Reload sync accounts
          this.dialogRef.close();
          refreshSyncAccounts(this.userAccount, this.acctService, this.store);
        },
        () => {
          // Error
          this.dialogRef.close();
          this.dialog.makeWarnDialog('Add Account Failed',
            'Failed to add account.  Please try again.  If this problem persists, please contact the administrator.')
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
