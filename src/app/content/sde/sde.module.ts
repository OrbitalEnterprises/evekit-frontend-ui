import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SdeRoutingModule} from './sde-routing.module';
import {MaterialModule} from '../../material/material.module';
import {SdeViewerComponent} from './sde-viewer.component';

@NgModule({
  imports: [
    CommonModule,
    SdeRoutingModule,
    MaterialModule
  ],
  declarations: [SdeViewerComponent]
})
export class SdeModule { }
