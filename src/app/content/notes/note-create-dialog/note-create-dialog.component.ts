import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AccountService, EveKitUserAccount, EveKitUserAuthSource} from '../../../platform-service-api';
import {DialogsService} from '../../../platform/dialogs.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {extractRemoteErrorMsg} from '../../../platform/utilities';

@Component({
  selector: 'app-note-create-dialog',
  templateUrl: './note-create-dialog.component.html',
  styleUrls: ['./note-create-dialog.component.css']
})
export class NoteCreateDialogComponent {
  broadcast = new FormControl(false);
  content = new FormControl('', [
    Validators.required,
    Validators.minLength(1)
  ]);
  formModel: FormGroup = new FormGroup({
    broadcast: this.broadcast,
    content: this.content
  });
  userList: EveKitUserAccount[] = [];
  userSourceMap: Map<number, EveKitUserAuthSource> = new Map<number, EveKitUserAuthSource>();
  selectedUser: EveKitUserAccount = null;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              private dialogRef: MatDialogRef<NoteCreateDialogComponent>,
              private accountService: AccountService,
              private dialogService: DialogsService) {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userList = [];
    this.accountService.listUsers()
      .subscribe(
        ul => {
          const filtered: EveKitUserAccount[] = [];
          for (const next of ul) {
            if (next.active) {
              filtered.push(next);
            }
          }
          this.userList = filtered;
          for (const next of filtered) {
            this.accountService.getUserLastSource(parseInt(next.uid, 10))
              .subscribe(
                lastSource => {
                  this.userSourceMap.set(parseInt(next.uid, 10), lastSource);
                },
                err => {
                  this.dialogService.makeWarnDialog(
                    'Failed to Load Users',
                    `Failed to load users with error: ${extractRemoteErrorMsg(err)}.`
                  );
                }
              );
          }
        }
      );
  }

  makeDisplayableUser(user: EveKitUserAccount): string {
    const uid = parseInt(user.uid, 10);
    let display = `UID: ${user.uid} LOGIN: `;
    if (this.userSourceMap.has(uid) && this.userSourceMap.get(uid) !== null) {
      const mp = this.userSourceMap.get(uid);
      display = display + `${mp.screenName} (${mp.source})`;
    } else {
      display = display + 'never logged in';
    }
    return display;
  }

  selectUser(user: EveKitUserAccount): void {
    this.selectedUser = user;
  }

  isValid(): boolean {
    return (this.selectedUser !== null || this.broadcast.value === true) &&
      this.content.valid;
  }

  ok(): void {
    this.dialogRef.close(null);
    if (this.broadcast.value === true) {
      // Broadcast a note to all users
      this.accountService.broadcastNotification(this.content.value)
        .subscribe(
          () => {},
          err => {
            this.dialogService.makeWarnDialog(
              'Failed to Broadcast Note',
              `Failed to broadcast note with error: ${extractRemoteErrorMsg(err)}.`
            );
          }
        );
    } else {
      const uid = parseInt(this.selectedUser.uid, 10);
      this.accountService.createNotification(uid, this.content.value)
        .subscribe(
          () => {},
          err => {
            this.dialogService.makeWarnDialog(
              'Failed to Send Note',
              `Failed to send note to UID: ${uid} with error: ${extractRemoteErrorMsg(err)}.`
            );
          }
        );
    }
  }

  cancel(): void {
    this.dialogRef.close(null);
  }

}
