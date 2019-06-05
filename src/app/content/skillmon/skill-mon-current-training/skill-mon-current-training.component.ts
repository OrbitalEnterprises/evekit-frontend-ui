import {Component, Input, OnChanges, OnDestroy} from '@angular/core';
import {SkillTree} from '../skill-mon-character-view/skill-tree';
import {SkillInQueue} from '../../../model-service-api';
import {Observable, Subscription} from 'rxjs';
import {formatLevel} from '../skill-mon-character-summary/skill-mon-character-summary.component';
import {TrainingDivision} from '../skill-mon-skill-row/training-division';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-skill-mon-current-training',
  templateUrl: './skill-mon-current-training.component.html',
  styleUrls: ['./skill-mon-current-training.component.css']
})
export class SkillMonCurrentTrainingComponent implements OnDestroy, OnChanges {

  // Inputs
  @Input()
  paused: boolean;
  @Input()
  empty: boolean;
  @Input()
  first: SkillInQueue;
  @Input()
  last: SkillInQueue;
  @Input()
  skillTree: SkillTree;
  @Input()
  secondTimer: Observable<number>;
  @Input()
  divisions: Array<TrainingDivision> = [];

  // Local state
  secondWatcher: Subscription = null;
  finishTimeText = '';
  lastFinishTimeText = '';

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnDestroy(): void {
    if (this.secondWatcher != null) {
      this.secondWatcher.unsubscribe();
    }
  }

  ngOnChanges(): void {
    if (this.secondWatcher === null) {
      this.secondWatcher = this.secondTimer.subscribe(
        () => this.update()
      );
    }
  }

  update(): void {
    let ts = Date.now();
    if (this.empty || this.paused) {
      this.finishTimeText = '';
      this.lastFinishTimeText = '';
      return;
    }
    if (ts > this.first.endTime) {
      ts = this.first.endTime;
    }
    this.finishTimeText = this.formatFinishTime(ts, this.first.endTime);
    this.lastFinishTimeText = this.formatFinishTime(ts, this.last.endTime);
  }

  getSkillName(): string {
    return this.skillTree.skillList.get(this.first.typeID).typeName;
  }

  getLevelName(): string {
    return formatLevel(this.first.level);
  }

  getSPPerHour(): number {
    const sk = this.first;
    return Math.floor((sk.endSP - sk.trainingStartSP) / ((sk.endTime - sk.startTime) / 3600000));
  }

  formatFinishTime(now: number, finish: number): string {
    const left = finish - now;
    let seconds = Math.floor(left / 1000);
    const days = Math.floor(seconds / (24 * 60 * 60));
    seconds -= days * 24 * 60 * 60;
    const hours = Math.floor(seconds / (60 * 60));
    seconds -= hours * 60 * 60;
    const minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;
    let result = '';
    if (days > 0) {
      result += String(days) + ' days, ';
    }
    if (days > 0 || hours > 0) {
      result += String(hours) + ' hours, ';
    }
    if (days > 0 || hours > 0 || minutes > 0) {
      result += String(minutes) + ' minutes, ';
    }
    result += String(seconds) + ' seconds';
    return result;
  }

}
