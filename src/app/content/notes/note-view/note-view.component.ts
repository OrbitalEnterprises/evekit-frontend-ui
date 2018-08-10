import {Component} from '@angular/core';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {AccountService, EveKitUserAccount, EveKitUserAuthSource, EveKitUserNotification} from '../../../platform-service-api';
import {DialogsService} from '../../../platform/dialogs.service';
import {extractRemoteErrorMsg} from '../../../platform/utilities';
import {NoteCreateDialogComponent} from '../note-create-dialog/note-create-dialog.component';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})
export class NoteViewComponent {
  displayedColumns: string[] = ['actions', 'time', 'content'];
  userList: EveKitUserAccount[] = [];
  userSourceMap: Map<number, EveKitUserAuthSource> = new Map<number, EveKitUserAuthSource>();
  selectedUser: EveKitUserAccount = null;
  notesData: EveKitUserNotification[] = [];
  notesDataSource = new MatTableDataSource<EveKitUserNotification>(this.notesData);

  constructor(private accountService: AccountService,
              private dialogService: DialogsService,
              private dialog: MatDialog) {
    this.loadUsers();
  }

  noteClass(note: EveKitUserNotification): string {
    if (note.read === 0) {
      return 'unread';
    }
    return '';
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
    if (this.userSourceMap.has(uid)) {
      const mp = this.userSourceMap.get(uid);
      display = display + `${mp.screenName} (${mp.source})`;
    } else {
      display = display + 'never logged in';
    }
    return display;
  }

  selectUser(user: EveKitUserAccount): void {
    this.selectedUser = user;
    this.loadNotifications();
  }

  loadNotifications(): void {
    const uid = parseInt(this.selectedUser.uid, 10);
    this.accountService.listNotifications(uid)
      .subscribe(
        nl => {
          this.notesData = [];
          for (const n of nl) {
            this.notesData.push(n);
          }
          this.notesDataSource.data = this.notesData;
        }
      );
  }

  createNote(): void {
    this.dialog.open(NoteCreateDialogComponent).afterClosed().subscribe(
      () => {
        if (this.selectedUser !== null) {
          this.loadNotifications();
        } else {
          this.loadUsers();
        }
      }
    );
  }

  delete(el: EveKitUserNotification): void {
    this.dialogService.makeConfirmDialog('Confirm Delete',
      'Are you sure you want to delete this notification?')
      .afterClosed().subscribe(
      answer => {
        if (answer) {
          const uid = parseInt(el.account.uid, 10);
          this.accountService.markNoteDeleted(uid, el.nid)
            .subscribe(
              () => {
                this.loadNotifications();
              },
              err => {
                this.dialogService.makeWarnDialog(
                  'Failed to Delete Notification',
                  `Failed to delete notification for UID: ${uid} NID: ${el.nid} with error: ${extractRemoteErrorMsg(err)}.`
                );
              }
            );
        }
      }
    );
  }

}
