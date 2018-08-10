import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminUsersViewComponent} from './admin-users-view/admin-users-view.component';

const routes: Routes = [
  {
    path: '',
    component: AdminUsersViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminUsersRoutingModule {
}
