import {Component} from '@angular/core';
import {MatDialog} from '@angular/material';
import {SettingsDialogComponent} from './settings-dialog.component';
import {AppState} from '../../../store/store-model';
import {Store} from '@ngrx/store';
import {EveKitUserAccount} from '../../../platform-service-api';
import {selectUserAccount} from '../../selectors';

@Component({
  selector: 'app-toolbar-settings',
  templateUrl: './toolbar-settings.component.html',
  styleUrls: ['./toolbar-settings.component.css']
})
export class ToolbarSettingsComponent {
  account: EveKitUserAccount = null;

  constructor(private store: Store<AppState>, private dialog: MatDialog) {
    this.store.select(selectUserAccount).subscribe(
      next => {
        this.account = next;
      }
    );
  }

  openSettingsDialog(): void {
    this.dialog.open(SettingsDialogComponent, { data: this.account });
  }

}
