import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminPropsViewComponent} from './admin-props-view/admin-props-view.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPropsViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPropsRoutingModule {
}
