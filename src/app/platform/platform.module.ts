/**
 * The platform is the basic framework in which the content pages live.  The platform
 * provides functionality to manage logins, the main application header-menu, and tools
 * for switching between application pages.  In the fullness of time, the platform
 * will also define a plugin mechanism.
 */
import {CommonModule, HashLocationStrategy, Location, LocationStrategy} from '@angular/common';
import {NgModule} from '@angular/core';
import {MaterialModule} from '../material/material.module';
import {VersionComponent} from './version/version.component';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {ToolbarSettingsComponent} from './toolbar/settings/toolbar-settings.component';
import {ToolbarNotificationsComponent} from './toolbar/notifications/toolbar-notifications.component';
import {ToolbarAuthComponent} from './toolbar/auth/toolbar-auth.component';
import {ToolbarLoginComponent} from './toolbar/auth/login/toolbar-login.component';
import {UserinfoComponent} from './toolbar/auth/userinfo/userinfo.component';
import {ExtractFirstPipe, ExtractScreenNamePipe, ExtractSourceNamePipe, ExtractUserCreatedPipe} from './pipes';
import {UserinfoDialogComponent} from './toolbar/auth/userinfo/userinfo-dialog.component';
import {MatDialog} from '@angular/material';
import {ConfirmDialogComponent, StandardDialogComponent} from './dialogs.service';
import {SettingsDialogComponent} from './toolbar/settings/settings-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MenuComponent} from './menu/menu.component';
import {RouterModule} from '@angular/router';
import {CreateSyncAccountComponent} from './menu/create-sync-account/create-sync-account.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    VersionComponent,
    ToolbarComponent,
    ToolbarSettingsComponent,
    ToolbarNotificationsComponent,
    ToolbarAuthComponent,
    ToolbarLoginComponent,
    UserinfoComponent,
    UserinfoDialogComponent,
    ExtractFirstPipe,
    ExtractScreenNamePipe,
    ExtractSourceNamePipe,
    ExtractUserCreatedPipe,
    StandardDialogComponent,
    ConfirmDialogComponent,
    SettingsDialogComponent,
    MenuComponent,
    CreateSyncAccountComponent
  ],
  entryComponents: [
    UserinfoComponent,
    UserinfoDialogComponent,
    StandardDialogComponent,
    ConfirmDialogComponent,
    ToolbarComponent,
    SettingsDialogComponent,
    CreateSyncAccountComponent
  ],
  exports: [
    VersionComponent,
    ToolbarComponent,
    MenuComponent
  ],
  providers: [
    Location,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    MatDialog
  ]
})
export class PlatformModule {
}
