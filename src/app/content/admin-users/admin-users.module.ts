import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminUsersViewComponent} from './admin-users-view/admin-users-view.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HttpClientModule} from '@angular/common/http';
import {MaterialModule} from '../../material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AdminUsersRoutingModule} from './admin-users-routing.module';
import {AdminUsersViewAccountsDialogComponent} from './admin-users-view-accounts-dialog/admin-users-view-accounts-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    AdminUsersRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  declarations: [
    AdminUsersViewComponent,
    AdminUsersViewAccountsDialogComponent
  ],
  entryComponents: [
    AdminUsersViewAccountsDialogComponent
  ]
})
export class AdminUsersModule { }
