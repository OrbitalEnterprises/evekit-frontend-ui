import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NoteViewComponent} from './note-view/note-view.component';

const routes: Routes = [
  {
    path: '',
    component: NoteViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule {
}
