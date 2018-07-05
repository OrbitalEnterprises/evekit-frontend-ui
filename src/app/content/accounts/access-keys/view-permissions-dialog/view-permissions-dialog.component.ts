import {Component, Inject} from '@angular/core';
import {AccessKeyMask, EK_CharacterMaskConstants, EK_CorporationMaskConstants} from '../access-key-mask';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {EditEsiTokenDialogComponent} from '../../summary/edit-esi-token-dialog/edit-esi-token-dialog.component';
import {SynchronizedAccountAccessKey, SynchronizedEveAccount} from '../../../../platform-service-api';

@Component({
  selector: 'app-view-permissions-dialog',
  templateUrl: './view-permissions-dialog.component.html',
  styleUrls: ['./view-permissions-dialog.component.css', '../../accounts-view.component.css']
})
export class ViewPermissionsDialogComponent {
  account: SynchronizedEveAccount = null;
  key: SynchronizedAccountAccessKey = null;
  maskList: AccessKeyMask[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              private dialogRef: MatDialogRef<EditEsiTokenDialogComponent>) {
    this.account = data['account'];
    this.key = data['key'];
    const fullMaskList = this.account.characterType ? EK_CharacterMaskConstants : EK_CorporationMaskConstants;
    const setMasks: Set<string> = new Set<string>();
    for (const maskName of this.key.maskValueString.split('|')) {
      setMasks.add(maskName);
    }

    for (const nextMask of fullMaskList) {
      if (setMasks.has(nextMask.value)) {
        this.maskList.push(nextMask);
      }
    }

    this.maskList.sort((a, b) => {
      if (a.description < b.description) {
        return -1;
      }
      if (a.description > b.description) {
        return 1;
      }
      return 0;
    });
  }

  ok(): void {
    this.dialogRef.close();
  }

}
