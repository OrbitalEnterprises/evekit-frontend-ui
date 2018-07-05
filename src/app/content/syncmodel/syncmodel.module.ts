import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SyncModelViewerComponent} from './sync-model-viewer.component';
import {SyncModelRoutingModule} from './syncmodel-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SyncModelRoutingModule
  ],
  declarations: [SyncModelViewerComponent]
})
export class SyncmodelModule {
}
