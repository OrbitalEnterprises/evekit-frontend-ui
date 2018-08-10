import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountsViewComponent} from './accounts-view.component';
import {SummaryComponent} from './summary/summary.component';
import {SyncStatusComponent} from './sync-status/sync-status.component';
import {AccountsRoutingModule} from './accounts-routing.module';
import {MaterialModule} from '../../material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HttpClientModule} from '@angular/common/http';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AccessKeysComponent} from './access-keys/access-keys.component';
import {EditAccountNameDialogComponent} from './summary/edit-account-name-dialog/edit-account-name-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';
import {EditEsiTokenDialogComponent} from '../../edit-esi-token/edit-esi-token-dialog/edit-esi-token-dialog.component';
import {ViewScopesDialogComponent} from './summary/view-scopes-dialog/view-scopes-dialog.component';
import {EditAccessKeyDialogComponent} from '../../edit-access-key/edit-access-key-dialog/edit-access-key-dialog.component';
import {ViewPermissionsDialogComponent} from './access-keys/view-permissions-dialog/view-permissions-dialog.component';
import {EditEsiTokenModule} from '../../edit-esi-token/edit-esi-token.module';
import {EditAccessKeyModule} from '../../edit-access-key/edit-access-key.module';

@NgModule({
  imports: [
    CommonModule,
    AccountsRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    EditEsiTokenModule,
    EditAccessKeyModule
  ],
  declarations: [
    AccountsViewComponent,
    SummaryComponent,
    SyncStatusComponent,
    AccessKeysComponent,
    EditAccountNameDialogComponent,
    ViewScopesDialogComponent,
    ViewPermissionsDialogComponent],
  entryComponents: [
    EditAccountNameDialogComponent,
    EditEsiTokenDialogComponent,
    ViewScopesDialogComponent,
    EditAccessKeyDialogComponent,
    ViewPermissionsDialogComponent
  ]
})
export class AccountsModule {
}
