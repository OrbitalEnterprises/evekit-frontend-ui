import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QsComponent} from './qs.component';
import {MaterialModule} from '../../material/material.module';
import {QuickstartRoutingModule} from './quickstart-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {CreateSyncAccountComponent} from '../../create-sync-account/create-sync-account/create-sync-account.component';
import {MatDialog} from '@angular/material';
import {CreateSyncAccountModule} from '../../create-sync-account/create-sync-account.module';
import {EditEsiTokenModule} from '../../edit-esi-token/edit-esi-token.module';
import {EditEsiTokenDialogComponent} from '../../edit-esi-token/edit-esi-token-dialog/edit-esi-token-dialog.component';
import {EditAccessKeyModule} from '../../edit-access-key/edit-access-key.module';
import {EditAccessKeyDialogComponent} from '../../edit-access-key/edit-access-key-dialog/edit-access-key-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    QuickstartRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    CreateSyncAccountModule,
    EditEsiTokenModule,
    EditAccessKeyModule
  ],
  declarations: [
    QsComponent
  ],
  entryComponents: [
    CreateSyncAccountComponent,
    EditEsiTokenDialogComponent,
    EditAccessKeyDialogComponent
  ],
  providers: [
    MatDialog
  ]
})
export class QuickstartModule { }
