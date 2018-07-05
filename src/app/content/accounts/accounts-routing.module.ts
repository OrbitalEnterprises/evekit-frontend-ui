import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AccountsViewComponent} from './accounts-view.component';

const routes: Routes = [
  {
    path: '',
    component: AccountsViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule {
}
