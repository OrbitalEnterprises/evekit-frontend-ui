import {Component, Inject} from '@angular/core';
import {UserSettings} from '../../../store/user-settings-model';
import {AdminService, EveKitUserAccount} from '../../../platform-service-api';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {DialogsService} from '../../dialogs.service';
import {concat, Observable} from 'rxjs';

const userPropPrefix = 'UserSetting.';

interface UserSettingDefinition {
  key: string;
  name: string;
  description: string;
  default: string;
  controlType: string;
  verifier: string;
}

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html'
})
export class SettingsDialogComponent {
  settingsList: UserSettingDefinition[] = [];
  currentSettings: UserSettings = {};
  account: EveKitUserAccount = null;
  formModel: FormGroup = new FormGroup({
    settings: new FormArray([])
  });

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              private dialogRef: MatDialogRef<SettingsDialogComponent>,
              private adminService: AdminService,
              private dialogService: DialogsService) {
    this.account = data;
    const settingsArray: FormArray = <FormArray>this.formModel.get('settings');

    // Retrieve settings dictionary
    this.adminService.getConfigProps().subscribe(
      next => {
        for (const nextProp of next) {
          if (nextProp.propertyName.startsWith(userPropPrefix)) {
            const keyName = nextProp.propertyName.substr(userPropPrefix.length);
            const value = JSON.parse(nextProp.propertyValue);
            value.key = keyName;
            this.settingsList.push(value);
            settingsArray.push(new FormControl());
          }
        }

        // Now retrieve current user settings
        const uid = parseInt(this.account.uid, 10);
        this.adminService.getUserProps(uid).subscribe(
          propList => {
            for (const nextProp of propList) {
              this.currentSettings[nextProp.propertyName] = nextProp.propertyValue;
            }
          },
          error => {
            // TODO: drop copy error to server for diagnostics
            console.log(error);
            dialogService.makeWarnDialog('Settings Error',
              'Failed to load settings.  If this problem persists, please contact the administrator.');
          }
        );
      },
      error => {
        // TODO: drop copy error to server for diagnostics
        console.log(error);
        dialogService.makeWarnDialog('Settings Error',
          'Failed to load settings.  If this problem persists, please contact the administrator.');
      }
    );
  }

  getSettingValue(index: number): string {
    const def: UserSettingDefinition = this.settingsList[index];
    for (const userPropKey in this.currentSettings) {
      if (userPropKey === def.key) {
        return this.currentSettings[userPropKey];
      }
    }
    return def.default;
  }

  cancelChanges(): void {
    // Confirm if any fields have changed
    const settingsArray: FormArray = <FormArray>this.formModel.get('settings');
    let confirm = false;
    for (let i = 0; i < this.settingsList.length; i++) {
      const control = settingsArray.controls[i];
      if (control.dirty && control.value !== this.getSettingValue(i)) {
        confirm = true;
        break;
      }
    }

    if (confirm) {
      // Confirm before closing.
      const confirmDialog = this.dialogService.makeConfirmDialog('Cancel Changes',
        `You have unsaved changed.  Are you sure you want to cancel?`);
      confirmDialog.afterClosed().subscribe(result => {
        if (result) {
          // Discarding changes, close.
          this.dialogRef.close();
        }
      });
    } else {
      // Nothing changed, close.
      this.dialogRef.close();
    }
  }

  saveChanges(): void {
    // Save any changes before closing the dialog
    const uid = parseInt(this.account.uid, 10);
    const save: Observable<any>[] = [];
    const settingsArray: FormArray = <FormArray>this.formModel.get('settings');

    // Assemble all changes
    for (let i = 0; i < this.settingsList.length; i++) {
      const dict = this.settingsList[i];
      const control = settingsArray.controls[i];
      if (control.dirty && control.value !== this.getSettingValue(i)) {
        save.push(this.adminService.setUserProp(uid, dict.key, String(control.value)));
      }
    }

    // Save changes, signal any errors
    if (save.length > 0) {
      concat(...save).subscribe(
        () => {},
        error => {
          // Signal error, do not exit.
          // TODO: drop copy error to server for diagnostics
          console.log(error);
          this.dialogService.makeWarnDialog('Save Failed',
            'Unable to save all changes.  Please try again.  If this problem persists, please contact the admin.');
        },
        () => {
          // Finished, exit
          this.dialogRef.close();
        }
      );
    } else {
      // Nothing to save, just close dialog
      this.dialogRef.close();
    }
  }

}
