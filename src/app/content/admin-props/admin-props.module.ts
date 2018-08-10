import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminPropsViewComponent} from './admin-props-view/admin-props-view.component';
import {AdminPropsRoutingModule} from './admin-props-routing.module';
import {AdminPropsSystemComponent} from './admin-props-system/admin-props-system.component';
import {AdminPropsUserComponent} from './admin-props-user/admin-props-user.component';
import {MaterialModule} from '../../material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AdminPropsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  declarations: [
    AdminPropsViewComponent,
    AdminPropsSystemComponent,
    AdminPropsUserComponent
  ]
})
export class AdminPropsModule {
}
