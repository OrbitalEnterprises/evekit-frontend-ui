import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QsComponent} from './qs.component';

const routes: Routes = [
  {
    path: '',
    component: QsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuickstartRoutingModule {
}
