import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {AccountService, SynchronizedAccountAccessKey, SynchronizedEveAccount} from '../../../platform-service-api';
import {forkJoin, Observable} from 'rxjs';
import {ModelCharacterService, CharacterSheet, ModelCommonService, CharacterSkill, SkillInQueue} from '../../../model-service-api';
import {InvType, SDECharacterService, SDEInventoryService} from '../../../sde-service-api';
import {SkillGroup} from './skill-group';
import {SkillTree} from './skill-tree';
import {formatLevel} from '../skill-mon-character-summary/skill-mon-character-summary.component';
import {TrainingDivision} from '../skill-mon-skill-row/training-division';

@Component({
  selector: 'app-skill-mon-character-view',
  templateUrl: './skill-mon-character-view.component.html',
  styleUrls: ['./skill-mon-character-view.component.css']
})
export class SkillMonCharacterViewComponent implements OnChanges {
  // Input parameters
  @Input()
  account: SynchronizedEveAccount;
  @Input()
  kid: number;
  @Input()
  secondTimer: Observable<number>;
  @Input()
  skillTree: SkillTree;
  access: SynchronizedAccountAccessKey;
  skillGroupList: Array<SkillGroup> = [];
  hideUntrained: false;

  // Summary properties
  charSheet: CharacterSheet = null;
  gender: string;
  race: string;
  bloodline: string;
  balance = -1;
  intelligence = -1;
  perception = -1;
  charisma = -1;
  willpower = -1;
  memory = -1;
  totalSP = -1;
  unallocatedSP = -1;
  knownSkills: Array<CharacterSkill> = [];
  currentQueue: Array<SkillInQueue> = [];

  constructor(private accountService: AccountService,
              private commonModelService: ModelCommonService,
              private charModelService: ModelCharacterService,
              private charSDEService: SDECharacterService) {
  }

  ngOnChanges(): void {
    if (!this.account) {
      return;
    }
    this.accountService.getAccessKey(-1, this.account.aid, this.kid)
      .subscribe(
        keyList => {
          if (keyList.length === 1) {
            this.access = keyList[0];
            this.update();
          } else {
            // TODO - key list should have length of exactly 1
          }
        },
        () => {
          // TODO
        }
      );
    // Extract skill groups - can't use the iterator directly here
    const it = this.skillTree.skillGroups.values();
    for (let next = it.next(); !next.done; next = it.next()) {
      this.skillGroupList.push(next.value);
    }
    this.skillGroupList = this.skillGroupList.sort((a, b) => a.groupName.localeCompare(b.groupName));
  }

  queueToDivisions(active: number): Array<TrainingDivision> {
    const results: Array<TrainingDivision> = [];
    if (this.currentQueue.length > 0 && this.currentQueue[0].endTime !== 0) {
      const now = Date.now();
      const total = this.currentQueue[this.currentQueue.length - 1].endTime - now;
      let lastStart = now;
      for (let i = 0; i < this.currentQueue.length; i++) {
        const timeCurrent = this.currentQueue[i].endTime - lastStart;
        results.push(new TrainingDivision(i, Math.floor(timeCurrent / total * 100), i === active));
        lastStart = this.currentQueue[i].endTime;
      }
    }
    return results;
  }

  queueToAlternateDivisions(): Array<TrainingDivision> {
    const results: Array<TrainingDivision> = [];
    if (this.currentQueue.length > 0 && this.currentQueue[0].endTime !== 0) {
      const now = Date.now();
      const total = this.currentQueue[this.currentQueue.length - 1].endTime - now;
      let lastStart = now;
      for (let i = 0; i < this.currentQueue.length; i++) {
        const timeCurrent = this.currentQueue[i].endTime - lastStart;
        results.push(new TrainingDivision(i, Math.floor(timeCurrent / total * 100), i % 2 === 0));
        lastStart = this.currentQueue[i].endTime;
      }
    }
    return results;
  }

  countSkillsInGroup(group: SkillGroup): number {
    let total = 0;
    for (const next of this.knownSkills) {
      if (group.skillList.includes(next.typeID)) {
        total++;
      }
    }
    return total;
  }

  skillsInGroup(group: SkillGroup, omitUntrained: boolean = false): InvType[] {
    let skillList: Array<InvType> = [];
    for (const next of group.skillList) {
      const nextSkill = this.skillTree.skillList.get(next);
      if (!omitUntrained || this.spForSkill(nextSkill) > 0) {
        skillList.push(nextSkill);
      }
    }
    skillList = skillList.sort((a, b) => a.typeName.localeCompare(b.typeName));
    return skillList;
  }

  countPointsInGroup(group: SkillGroup): number {
    let total = 0;
    for (const next of this.knownSkills) {
      if (group.skillList.includes(next.typeID)) {
        total += next.skillpoints;
      }
    }
    return total;
  }

  levelForSkill(skill: InvType) {
    const tid = skill.typeID;
    for (const next of this.knownSkills) {
      if (next.typeID === tid) {
        return next.trainedSkillLevel;
      }
    }
    return 0;
  }

  spForSkill(skill: InvType) {
    const tid = skill.typeID;
    for (const next of this.knownSkills) {
      if (next.typeID === tid) {
        return next.skillpoints;
      }
    }
    return 0;
  }

  setCurrentQueue(retrieved: Array<SkillInQueue>): void {
    this.currentQueue = [];
    if (retrieved.length === 0) {
      return;
    }

    // Queue only updated when user logs in.  If user hasn't logged in for a while, there may be
    // several older entries still in queue.  We eliminate those here.
    const process: Array<SkillInQueue> = [];
    const now = Date.now();
    for (const next of retrieved) {
      if (next.endTime === 0 || next.endTime > now) {
        process.push(next);
      }
    }
    if (process.length === 0) {
      return;
    }

    // Finally, sort the items in the queue for convenience.
    this.currentQueue = process.sort((a, b) => a.queuePosition - b.queuePosition);
  }

  update(): void {
    forkJoin(
      this.commonModelService.getAccountBalance(this.access.accessKey, this.access.credential),
      this.charModelService.getCharacterSheets(this.access.accessKey, this.access.credential),
      this.charModelService.getCharacterSheetAttributes(this.access.accessKey, this.access.credential),
      this.charModelService.getSkillPoints(this.access.accessKey, this.access.credential),
      this.charModelService.getSkillsInQueue(this.access.accessKey, this.access.credential)
    ).subscribe(
      results => {
        // Extract account balance
        this.balance = results[0].length === 1 ? results[0][0].balance : -1;
        // Extract attributes
        this.intelligence = results[2].length === 1 ? results[2][0].intelligence : -1;
        this.perception = results[2].length === 1 ? results[2][0].perception : -1;
        this.charisma = results[2].length === 1 ? results[2][0].charisma : -1;
        this.willpower = results[2].length === 1 ? results[2][0].willpower : -1;
        this.memory = results[2].length === 1 ? results[2][0].memory : -1;
        // Extract character total skill points
        this.totalSP = results[3].length === 1 ? results[3][0].totalSkillPoints : -1;
        this.unallocatedSP = results[3].length === 1 ? results[3][0].unallocatedSkillPoints : -1;
        // Extract skills in queue
        this.setCurrentQueue(results[4]);
        // Extract character sheet
        this.charSheet = results[1].length === 1 ? results[1][0] : null;
        if (this.charSheet !== null) {
          const val = this.charSheet.gender;
          this.gender = val[0].toLocaleUpperCase() + val.substr(1);
          this.retrieveHeritage();
        } else {
          this.gender = '';
          this.race = '';
          this.bloodline = '';
        }
        // Start skill retrieval
        this.retrieveSkills();
      },
      () => {
        // TODO - error
      }
    );
  }

  skillsAtLevelV(): number {
    let count = 0;
    for (const next of this.knownSkills) {
      if (next.trainedSkillLevel === 5) {
        count++;
      }
    }
    return count;
  }

  retrieveSkills(contid = -1): void {
    if (contid === -1) {
      this.knownSkills = [];
    }
    this.charModelService.getSkills(this.access.accessKey, this.access.credential, undefined, contid)
      .subscribe(
        results => {
          this.knownSkills = this.knownSkills.concat(results);
          if (results.length > 0) {
            const last = results.pop();
            this.retrieveSkills(last.cid);
          }
        },
        () => {
          // TODO: error
        }
      );
  }

  retrieveHeritage(): void {
    forkJoin(
      this.charSDEService.getRaces(-1, 1000, '{values:[' + String(this.charSheet.raceID) + ']}'),
      this.charSDEService.getBloodlines(-1, 1000, '{values:[' + String(this.charSheet.bloodlineID) + ']}')
    ).subscribe(
      results => {
        // Extract race
        this.race = results[0].length === 1 ? results[0][0].raceName : '';
        // Extract bloodline
        this.bloodline = results[1].length === 1 ? results[1][0].bloodlineName : '';
      },
      () => {
        // TODO - error
      }
    );
  }
}
