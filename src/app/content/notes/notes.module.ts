import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NoteViewComponent} from './note-view/note-view.component';
import {MaterialModule} from '../../material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HttpClientModule} from '@angular/common/http';
import {NotesRoutingModule} from './notes-routing.module';
import { NoteCreateDialogComponent } from './note-create-dialog/note-create-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    NotesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  declarations: [
    NoteViewComponent,
    NoteCreateDialogComponent
  ],
  entryComponents: [
    NoteCreateDialogComponent
  ]
})
export class NotesModule { }
