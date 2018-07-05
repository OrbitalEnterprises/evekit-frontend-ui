import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {AppState} from '../../../../store/store-model';
import {select, Store} from '@ngrx/store';
import {EveKitUserAuthSource} from '../../../../platform-service-api';
import {MatDialog} from '@angular/material';
import {UserinfoDialogComponent} from './userinfo-dialog.component';
import {selectUserSource} from '../../../selectors';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css', '../login/auth-buttons.css', '../login/toolbar-login.component.css']
})
export class UserinfoComponent {
  lastSource$: Observable<EveKitUserAuthSource>;

  constructor(private store: Store<AppState>, private dialog: MatDialog) {
    this.lastSource$ = this.store.pipe(select(selectUserSource));
  }

  openInfoDialog(): void {
    this.dialog.open(UserinfoDialogComponent, {});
  }

}
