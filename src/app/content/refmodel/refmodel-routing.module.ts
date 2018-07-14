import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RefmodelViewerComponent} from './refmodel-viewer.component';

const routes: Routes = [
  {
    path: '',
    component: RefmodelViewerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RefmodelRoutingModule {
}
