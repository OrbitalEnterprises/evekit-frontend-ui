import {Component, Input} from '@angular/core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {TrainingDivision} from './training-division';
import {DomSanitizer} from '@angular/platform-browser';

const BASE_SP = [
  0,
  250,
  1414,
  8000,
  45255,
  256000
];

@Component({
  selector: 'app-skill-mon-skill-row',
  templateUrl: './skill-mon-skill-row.component.html',
  styleUrls: ['./skill-mon-skill-row.component.css']
})
export class SkillMonSkillRowComponent {
  @Input()
  alternate: boolean;
  @Input()
  skillName: string;
  @Input()
  trainedLevel: number;
  @Input()
  skillPoints: number;
  @Input()
  rank: number;
  @Input()
  active = false;
  @Input()
  pending = false;
  @Input()
  divisions: Array<TrainingDivision> = [];

  // icons
  icOpen = far['faSquare'];
  icClose = fas['faSquare'];

  constructor(private sanitizer: DomSanitizer) {
  }

  levelTargetSkillPoints(level: number, rank: number): number {
    if (level > 5) {
      level = 5;
    }
    return BASE_SP[level] * rank;
  }

  levelTargetPct(level: number, sp: number, rank: number): number {
    if (level > 5) {
      level = 5;
    }
    const targetSP = this.levelTargetSkillPoints(level, rank);
    const prevSP = this.levelTargetSkillPoints(level - 1, rank);
    const delta = targetSP - prevSP;
    return Math.floor(Math.max(sp - prevSP, 0) / delta * 100);
  }

  levelClassMap(target: number): object {
    return {
      '': this.trainedLevel >= target,
      'ek-label-accent': this.trainedLevel === target - 1 && this.active,
      'ek-label-warn': this.trainedLevel === target - 1 && this.pending
    };
  }

  getIcon(target: number): object {
    if (this.trainedLevel >= target || (this.trainedLevel === target - 1 && (this.active || this.pending))) {
      return this.icClose;
    }
    return this.icOpen;
  }

}
