import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminSyncViewComponent} from './admin-sync-view/admin-sync-view.component';

const routes: Routes = [
  {
    path: '',
    component: AdminSyncViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminSyncRoutingModule {
}
