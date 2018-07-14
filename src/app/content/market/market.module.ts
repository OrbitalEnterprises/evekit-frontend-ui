import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketViewerComponent } from './market-viewer.component';
import {MarketRoutingModule} from './market-routing.module';
import {MaterialModule} from '../../material/material.module';

@NgModule({
  imports: [
    CommonModule,
    MarketRoutingModule,
    MaterialModule
  ],
  declarations: [MarketViewerComponent]
})
export class MarketModule { }
