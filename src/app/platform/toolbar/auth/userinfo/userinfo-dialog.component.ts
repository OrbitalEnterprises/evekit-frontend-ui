import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {AppState} from '../../../../store/store-model';
import {select, Store} from '@ngrx/store';
import {EveKitUserAccount, EveKitUserAuthSource} from '../../../../platform-service-api';
import {DialogsService} from '../../../dialogs.service';
import {selectAuthSources, selectUserAccount, selectUserSource} from '../../../selectors';

@Component({
  selector: 'app-userinfo-dialog',
  templateUrl: './userinfo-dialog.component.html',
  styleUrls: ['./userinfo.component.css', '../login/auth-buttons.css', '../login/toolbar-login.component.css']
})
export class UserinfoDialogComponent {
  account$: Observable<EveKitUserAccount>;
  lastSource$: Observable<EveKitUserAuthSource>;
  sources$: Observable<Array<EveKitUserAuthSource>>;
  sourceTypes: string[] = ['twitter', 'google', 'eve'];
  lastSourceList: EveKitUserAuthSource[] = [];

  constructor(private store: Store<AppState>, private dialogService: DialogsService) {
    this.account$ = this.store.pipe(select(selectUserAccount));
    this.lastSource$ = this.store.pipe(select(selectUserSource));
    this.sources$ = this.store.pipe(select(selectAuthSources));
    this.sources$.subscribe(
      u => {
        this.lastSourceList = [];
        for (const next of u) {
          this.lastSourceList.push(next);
        }
      }
    );
  }

  /**
   * This function is called when the user explicitly requests to logout.
   */
  logout(): void {
    window.location.assign('/api/ws/v1/auth/logout');
  }

  sourceType(sourceName: string): string {
    switch (sourceName) {
      case 'eve':
        return 'EVE Online';
      case 'google':
        return 'Google';
      case 'twitter':
        return 'Twitter';
      default:
        return 'Unknown';
    }
  }

  hasSignOn(sourceName: string): boolean {
    for (const src of this.lastSourceList) {
      if (src.source === sourceName) {
        return true;
      }
    }
    return false;
  }

  signOnName(sourceName: string): string {
    for (const src of this.lastSourceList) {
      if (src.source === sourceName) {
        return src.screenName;
      }
    }
    return null;
  }

  signOnTime(sourceName: string): number {
    for (const src of this.lastSourceList) {
      if (src.source === sourceName) {
        return src.last;
      }
    }
    return 0;
  }

  removeSource(sourceName: string): void {
    const dialogRef = this.dialogService.makeConfirmDialog('Remove Source',
      `Are you sure you want to remove source '${sourceName}'?  (This will log you out)`);
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            window.location.assign('/api/ws/v1/auth/remove/' + sourceName);
          }
        });
  }

  addSource(sourceName: string): void {
    window.location.assign('/api/ws/v1/auth/login/' + sourceName);
  }

}
