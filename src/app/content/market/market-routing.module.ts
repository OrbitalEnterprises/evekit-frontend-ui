import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MarketViewerComponent} from './market-viewer.component';

const routes: Routes = [
  {
    path: '',
    component: MarketViewerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketRoutingModule {
}
