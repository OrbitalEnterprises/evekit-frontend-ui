import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {MaterialModule} from './material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {OverlayContainer} from '@angular/cdk/overlay';
import {appStoreModel} from './store/store-model';
import {PlatformModule} from './platform/platform.module';
import {RouterModule} from '@angular/router';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {standardRouteConfig} from './routing';
import {AdminActivator, LoggedInActivator} from './platform/activators';
import {Configuration, PlatformServiceApiModule} from './platform-service-api';
import {SdeServiceApiModule} from './sde-service-api';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    PlatformModule,
    appStoreModel,
    RouterModule,
    standardRouteConfig,
    PlatformServiceApiModule.forRoot(() => new Configuration({ basePath: environment.platformServiceApiBasePath})),
    SdeServiceApiModule.forRoot(() => new Configuration({ basePath: environment.sdeServiceApiBasePath}))
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    AdminActivator,
    LoggedInActivator
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(overlayContainer: OverlayContainer) {
    overlayContainer.getContainerElement().classList.add('evekit-light-theme');
  }
}
