import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SkillMonMainComponent} from './skill-mon-main.component';
import {MaterialModule} from '../../material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HttpClientModule} from '@angular/common/http';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SkillmonRoutingModule} from './skillmon-routing.module';
import {SelectCharacterDialogComponent} from './select-character-dialog/select-character-dialog.component';
import { SkillMonCharacterSummaryComponent } from './skill-mon-character-summary/skill-mon-character-summary.component';
import { SkillMonCharacterViewComponent } from './skill-mon-character-view/skill-mon-character-view.component';
import { SkillMonSkillRowComponent } from './skill-mon-skill-row/skill-mon-skill-row.component';
import { SkillMonCurrentTrainingComponent } from './skill-mon-current-training/skill-mon-current-training.component';

/*
 * This module implements a simple version of EveMon using data stored
 * by EveKit.  Configuration of this application is driven by user
 * properties.  Specifically:
 *
 * appSkillMonAccounts - a JSON encoded list of monitored accounts (see below).
 *
 * The contents of appSkillMonAccounts is a JSON list of objects where each
 * object has the format:
 *
 * {
 *   charName: name of character for this account,
 *   aid: sync account ID from which this character is sourced,
 *   kid: access key ID defined on the sync account used for access
 * }
 */

@NgModule({
  imports: [
    CommonModule,
    SkillmonRoutingModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  declarations: [
    SkillMonMainComponent,
    SelectCharacterDialogComponent,
    SkillMonCharacterSummaryComponent,
    SkillMonCharacterViewComponent,
    SkillMonSkillRowComponent,
    SkillMonCurrentTrainingComponent
  ],
  entryComponents: [
    SelectCharacterDialogComponent
  ]
})
export class SkillmonModule { }
