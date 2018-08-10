import {Component, OnDestroy} from '@angular/core';
import {AccountService, EveKitUserAccount, EveKitUserNotification} from '../../../platform-service-api';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/store-model';
import {selectUserAccount} from '../../selectors';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material';
import {UserNoteViewDialogComponent} from './user-note-view-dialog/user-note-view-dialog.component';

@Component({
  selector: 'app-toolbar-notifications',
  templateUrl: './toolbar-notifications.component.html',
  styleUrls: ['./toolbar-notifications.component.css']
})
export class ToolbarNotificationsComponent implements OnDestroy {
  userSub: Subscription = null;
  user: EveKitUserAccount = null;
  notes: EveKitUserNotification[] = [];
  timer = 0;

  constructor(private store: Store<AppState>,
              private dialog: MatDialog,
              private accountService: AccountService) {
    this.userSub = this.store.select(selectUserAccount)
      .subscribe(
        u => {
          this.user = u;
          this.loadNotifications();
        }
      );

    this.timer = setInterval(() => {
      this.loadNotifications();
    }, 60000);
  }

  loadNotifications(): void {
    if (this.user === null) {
      return;
    }
    this.notes = [];
    const uid = parseInt(this.user.uid, 10);
    this.accountService.listNotifications(uid)
      .subscribe(
        nl => {
          this.notes = nl;
        }
      );
  }

  unreadCount(): number {
    if (this.user === null) {
      return 0;
    }
    let count = 0;
    for (const el of this.notes) {
      if (el.read <= 0) {
        count++;
      }
    }
    return count;
  }

  ngOnDestroy(): void {
    if (this.userSub !== null) {
      this.userSub.unsubscribe();
    }
    if (this.timer !== 0) {
      clearInterval(this.timer);
    }
  }

  viewNotes(): void {
    if (this.notes.length === 0) {
      return;
    }
    this.dialog.open(UserNoteViewDialogComponent, {
      data: {
        'user': this.user
      }
    }).afterClosed().subscribe(
      () => {
        this.loadNotifications();
      }
    );
  }


}
