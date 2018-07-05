import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SyncModelViewerComponent} from './sync-model-viewer.component';

const routes: Routes = [
  {
    path: '',
    component: SyncModelViewerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SyncModelRoutingModule {
}
