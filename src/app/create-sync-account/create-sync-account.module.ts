import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateSyncAccountComponent} from './create-sync-account/create-sync-account.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [
    CreateSyncAccountComponent
  ],
  exports: [
    CreateSyncAccountComponent
  ]
})
export class CreateSyncAccountModule { }
