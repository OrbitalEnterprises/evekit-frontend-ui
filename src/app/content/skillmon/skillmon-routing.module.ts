import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SkillMonMainComponent} from './skill-mon-main.component';

const routes: Routes = [
  {
    path: '',
    component: SkillMonMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SkillmonRoutingModule {
}
