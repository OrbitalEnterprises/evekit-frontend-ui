import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RefmodelViewerComponent } from './refmodel-viewer.component';
import {RefmodelRoutingModule} from './refmodel-routing.module';
import {MaterialModule} from '../../material/material.module';

@NgModule({
  imports: [
    CommonModule,
    RefmodelRoutingModule,
    MaterialModule
  ],
  declarations: [RefmodelViewerComponent]
})
export class RefmodelModule { }
