import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource} from '@angular/material';
import {AccountService, EveKitUserAccount, EveKitUserNotification} from '../../../../platform-service-api';
import {DialogsService} from '../../../dialogs.service';

@Component({
  selector: 'app-user-note-view-dialog',
  templateUrl: './user-note-view-dialog.component.html',
  styleUrls: ['./user-note-view-dialog.component.css']
})
export class UserNoteViewDialogComponent {
  displayedColumns: string[] = ['time', 'content', 'actions'];
  user: EveKitUserAccount = null;
  notesData: EveKitUserNotification[] = [];
  notesDataSource = new MatTableDataSource<EveKitUserNotification>(this.notesData);

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              private dialogRef: MatDialogRef<UserNoteViewDialogComponent>,
              private accountService: AccountService,
              private dialogService: DialogsService) {
    this.user = data['user'];
    this.loadNotifications();
  }

  loadNotifications(): void {
    const uid = parseInt(this.user.uid, 10);
    this.accountService.listNotifications(uid)
      .subscribe(
        nl => {
          this.notesData = [];
          for (const n of nl) {
            this.notesData.push(n);
          }
          this.notesDataSource.data = this.notesData;
          if (this.notesData.length === 0) {
            // May have deleted the last note so auto-close
            this.ok();
          }
        }
      );
  }

  noteClass(note: EveKitUserNotification): string {
    if (note.read === 0) {
      return 'unread';
    }
    return '';
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
              () => {
                this.dialogService.displayGenericUserError('Failed to Delete Notification',
                  `Failed to delete notification`);
              }
            );
        }
      }
    );
  }

  toggleRead(el: EveKitUserNotification): void {
    const uid = parseInt(el.account.uid, 10);
    this.accountService.markNoteRead(uid, el.nid)
      .subscribe(
        () => {
          this.loadNotifications();
        },
        () => {
          this.dialogService.displayGenericUserError('Failed to Mark Notification Read',
            `Failed to mark notification read`);
        }
      );
  }

  ok(): void {
    this.dialogRef.close(null);
  }

}
