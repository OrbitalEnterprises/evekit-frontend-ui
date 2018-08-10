import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminSyncViewComponent} from './admin-sync-view/admin-sync-view.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HttpClientModule} from '@angular/common/http';
import {MaterialModule} from '../../material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AdminSyncRoutingModule} from './admin-sync-routing.module';
import {AdminSyncAccountComponent} from './admin-sync-account/admin-sync-account.component';
import {AdminSyncRefComponent} from './admin-sync-ref/admin-sync-ref.component';
import {AdminSyncViewDialogComponent} from './admin-sync-view-dialog/admin-sync-view-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    AdminSyncRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  declarations: [
    AdminSyncViewComponent,
    AdminSyncAccountComponent,
    AdminSyncRefComponent,
    AdminSyncViewDialogComponent
  ],
  entryComponents: [
    AdminSyncViewDialogComponent
  ]

})
export class AdminSyncModule { }
