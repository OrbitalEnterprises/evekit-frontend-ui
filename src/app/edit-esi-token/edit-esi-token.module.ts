import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material/material.module';
import {EditEsiTokenDialogComponent} from './edit-esi-token-dialog/edit-esi-token-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [
    EditEsiTokenDialogComponent
  ],
  exports: [
    EditEsiTokenDialogComponent
  ]
})
export class EditEsiTokenModule { }
