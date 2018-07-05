import {Component, Inject} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {AccountService, SynchronizedAccountAccessKey, SynchronizedEveAccount} from '../../../../platform-service-api';
import {KeyNameUniqueValidator} from '../key-name-unique-validator';
import {AccessKeyMask, EK_CharacterMaskConstants, EK_CorporationMaskConstants} from '../access-key-mask';
import {AppState} from '../../../../store/store-model';
import {Store} from '@ngrx/store';
import {EditEsiTokenDialogComponent} from '../../summary/edit-esi-token-dialog/edit-esi-token-dialog.component';
import {DialogsService} from '../../../../platform/dialogs.service';
import {MAT_DATE_FORMATS, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {refreshSyncAccounts} from '../../../../platform/version/account-tools';

// Special import required for moment library.  See the docs.
import * as moment from 'moment';

export const MY_FORMATS = {
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
  }
};

@Component({
  selector: 'app-create-access-key-dialog',
  templateUrl: './edit-access-key-dialog.component.html',
  styleUrls: ['./edit-access-key-dialog.component.css', '../../accounts-view.component.css'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}
  ]
})
export class EditAccessKeyDialogComponent {
  keyEditMode = 'Add';
  account: SynchronizedEveAccount = null;
  accessKeys: SynchronizedAccountAccessKey[] = [];
  currentKey: SynchronizedAccountAccessKey = null;
  maskList: AccessKeyMask[] = [];

  keyName: FormControl = new FormControl('',
    [Validators.required,
      Validators.minLength(1),
      Validators.maxLength(100),
      Validators.pattern(/[a-zA-Z0-9_]+/g),
      KeyNameUniqueValidator(this.accessKeys)]);
  expiry: FormControl = new FormControl(moment(), [Validators.required]);
  expiryNever: FormControl = new FormControl(false);
  limit: FormControl = new FormControl(moment(), [Validators.required]);
  limitUnlimited: FormControl = new FormControl(false);
  permList: FormArray = new FormArray([]);

  formModel: FormGroup = new FormGroup({
    keyName: this.keyName,
    expiry: this.expiry,
    limit: this.limit,
    permList: this.permList
  });

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              private dialogRef: MatDialogRef<EditEsiTokenDialogComponent>,
              private store: Store<AppState>,
              private dialog: DialogsService,
              private acctService: AccountService) {
    this.keyEditMode = data['editMode'];
    this.account = data['account'];
    this.currentKey = data['currentKey'] || null;
    for (const key of data['accessKeys']) {
      if (this.currentKey === null || key.keyName !== this.currentKey.keyName) {
        this.accessKeys.push(key);
      }
    }
    this.maskList = this.account.characterType ? EK_CharacterMaskConstants : EK_CorporationMaskConstants;
    this.maskList.sort((a, b) => {
      if (a.description < b.description) { return -1; }
      if (a.description > b.description) { return 1; }
      return 0;
    });
    const setMasks: Set<string> = new Set<string>();
    if (this.currentKey !== null) {
      for (const maskName of this.currentKey.maskValueString.split('|')) {
        setMasks.add(maskName);
      }
      if (this.currentKey.expiry === -1) {
        this.expiryNever.setValue(true);
        this.expiry.reset();
      } else {
        this.expiryNever.setValue(false);
        this.expiry.setValue(moment(this.currentKey.expiry));
      }
      if (this.currentKey.limit === -1) {
        this.limitUnlimited.setValue(true);
        this.limit.reset();
      } else {
        this.limitUnlimited.setValue(false);
        this.limit.setValue(moment(this.currentKey.limit));
      }
      this.keyName.setValue(this.currentKey.keyName);
    }
    for (const mask of this.maskList) {
      const set = setMasks.has(mask.value);
      this.permList.controls.push(new FormControl(set));
    }
  }

  checkClearExpiry(): void {
    if (this.expiryNever.value) {
      this.expiry.reset();
    }
  }

  checkSetExpiry(): void {
    if (this.expiry.valid) {
      this.expiryNever.reset();
    }
  }

  checkClearLimit(): void {
    if (this.limitUnlimited.value) {
      this.limit.reset();
    }
  }

  checkSetLimit(): void {
    if (this.limit.valid) {
      this.limitUnlimited.reset();
    }
  }

  selectAllPermissions(): void {
    for (const ctrl of this.permList.controls) {
      ctrl.setValue(true);
    }
  }

  clearAllPermissions(): void {
    for (const ctrl of this.permList.controls) {
      ctrl.setValue(false);
    }
  }

  isValid(): boolean {
    return this.keyName.valid &&
      (this.expiry.valid || this.expiryNever.value) &&
      (this.limit.valid || this.limitUnlimited.value) &&
      this.permList.valid;
  }

  save(): void {
    // Extract selected permissions
    const requestedPermissions: string[] = [];
    for (let i = 0; i < this.maskList.length; i++) {
      if (this.permList.controls[i].value) {
        requestedPermissions.push(this.maskList[i].value);
      }
    }

    // Extract expiry and limit
    const keyid = this.currentKey !== null ? this.currentKey.kid : -1;
    const expiry = this.expiryNever.value ? -1 : this.expiry.value.valueOf();
    const limit = this.limitUnlimited.value ? -1 : this.limit.value.valueOf();

    // Add access key
    const newKey: SynchronizedAccountAccessKey = {
      keyName: this.keyName.value,
      expiry: expiry,
      limit: limit,
      maskValueString: requestedPermissions.join('|')
    };

    this.acctService.saveAccessKey(-1, this.account.aid, keyid, newKey)
      .subscribe(
        () => {
          // Close and refresh accounts to pick up change
          this.dialogRef.close();
          refreshSyncAccounts(this.account.userAccount, this.acctService, this.store);
        },
        () => {
          // Error
          this.dialogRef.close();
          this.dialog.makeWarnDialog(`${this.keyEditMode} Access Key Failed`,
            'Failed to set access key.  Please try again.  If this problem persists, please contact the administrator.')
            .afterClosed().subscribe(
            () => {
              refreshSyncAccounts(this.account.userAccount, this.acctService, this.store);
            }
          );
        }
      );
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
