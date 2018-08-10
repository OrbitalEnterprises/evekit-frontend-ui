import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material/material.module';
import {EditAccessKeyDialogComponent} from './edit-access-key-dialog/edit-access-key-dialog.component';
import {MomentDateModule} from '@angular/material-moment-adapter';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MomentDateModule
  ],
  declarations: [
    EditAccessKeyDialogComponent
  ],
  exports: [
    EditAccessKeyDialogComponent
  ]
})
export class EditAccessKeyModule { }
