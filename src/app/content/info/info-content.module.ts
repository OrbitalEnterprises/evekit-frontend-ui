import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WelcomeComponent} from './welcome/welcome.component';
import {BlogListComponent} from './blog-list/blog-list.component';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {MaterialModule} from '../../material/material.module';
import {InfoContentRoutingModule} from './info-content-routing.module';
import {InfoContentComponent} from './info-content.component';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    HttpClientJsonpModule,
    InfoContentRoutingModule,
    FlexLayoutModule
  ],
  declarations: [
    InfoContentComponent,
    WelcomeComponent,
    BlogListComponent
  ]
})
export class InfoContentModule {
}
