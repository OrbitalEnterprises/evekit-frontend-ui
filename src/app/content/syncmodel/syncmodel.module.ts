import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SyncModelViewerComponent} from './sync-model-viewer.component';
import {SyncModelRoutingModule} from './syncmodel-routing.module';
import {MaterialModule} from '../../material/material.module';

@NgModule({
  imports: [
    CommonModule,
    SyncModelRoutingModule,
    MaterialModule
  ],
  declarations: [SyncModelViewerComponent]
})
export class SyncmodelModule {
}
