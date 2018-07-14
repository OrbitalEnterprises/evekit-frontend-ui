import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SdeViewerComponent} from './sde-viewer.component';

const routes: Routes = [
  {
    path: '',
    component: SdeViewerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SdeRoutingModule {
}
