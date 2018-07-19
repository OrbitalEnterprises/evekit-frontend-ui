import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QsComponent} from './qs.component';
import {MaterialModule} from '../../material/material.module';
import {QuickstartRoutingModule} from './quickstart-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {CreateSyncAccountComponent} from '../../platform/menu/create-sync-account/create-sync-account.component';
import {MatDialog} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    QuickstartRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [
    QsComponent,
    CreateSyncAccountComponent
  ],
  entryComponents: [
    CreateSyncAccountComponent
  ],
  providers: [
    MatDialog
  ]
})
export class QuickstartModule { }
