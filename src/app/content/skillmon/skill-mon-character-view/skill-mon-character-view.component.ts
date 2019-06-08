import {Component, Input, OnChanges, OnDestroy} from '@angular/core';
import {AccountService, SynchronizedAccountAccessKey, SynchronizedEveAccount} from '../../../platform-service-api';
import {forkJoin, Observable, Subscription} from 'rxjs';
import {CharacterSheet, CharacterSkill, ModelCharacterService, ModelCommonService, SkillInQueue} from '../../../model-service-api';
import {InvType, SDECharacterService} from '../../../sde-service-api';
import {SkillGroup} from './skill-group';
import {SkillTree} from './skill-tree';
import {TrainingDivision} from '../skill-mon-skill-row/training-division';
import {ActivatedRoute, Router} from '@angular/router';
import {MatCheckboxChange, MatTabChangeEvent} from '@angular/material';
import {Location} from '@angular/common';
import {DialogsService} from '../../../platform/dialogs.service';

@Component({
  selector: 'app-skill-mon-character-view',
  templateUrl: './skill-mon-character-view.component.html',
  styleUrls: ['./skill-mon-character-view.component.css']
})
export class SkillMonCharacterViewComponent implements OnChanges, OnDestroy {
  // Input parameters
  @Input()
  account: SynchronizedEveAccount;
  @Input()
  kid: number;
  @Input()
  secondTimer: Observable<number>;
  @Input()
  skillTree: SkillTree;
  @Input()
  selectedTab = 0;
  access: SynchronizedAccountAccessKey;
  skillGroupList: Array<SkillGroup> = [];
  hideUntrained = false;

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
  tabView = 0;
  secondWatcher: Subscription = null;
  loading = false;

  constructor(private router: Router,
              private location: Location,
              private routeInfo: ActivatedRoute,
              private dialog: DialogsService,
              private accountService: AccountService,
              private commonModelService: ModelCommonService,
              private charModelService: ModelCharacterService,
              private charSDEService: SDECharacterService) {
    this.setTabFromRoute();
  }

  ngOnDestroy(): void {
    if (this.secondWatcher != null) {
      this.secondWatcher.unsubscribe();
    }
  }

  ngOnChanges(): void {
    if (this.secondWatcher === null) {
      this.secondWatcher = this.secondTimer.subscribe(
        () => this.updateTimeInProgress()
      );
    }
    if (!this.account) {
      return;
    }
    this.loading = true;
    this.accountService.getAccessKey(-1, this.account.aid, this.kid)
      .subscribe(
        keyList => {
          this.loading = false;
          if (keyList.length === 1) {
            this.access = keyList[0];
            this.update();
          } else {
            this.dialog.makeWarnDialog('Access Key Error', 'Error retrieving access key for \'' +
              this.account.eveCharacterName + '\'.  Please reload page to try again.  If problems persist, please contact the site admin.');
          }
        },
        () => {
          this.loading = false;
          this.dialog.makeWarnDialog('Access Key Error', 'Error retrieving access key for \'' +
            this.account.eveCharacterName + '\'.  Please reload page to try again.  If problems persist, please contact the site admin.');
        }
      );
    // Extract skill groups - can't use the iterator directly here
    const it = this.skillTree.skillGroups.values();
    for (let next = it.next(); !next.done; next = it.next()) {
      this.skillGroupList.push(next.value);
    }
    this.skillGroupList = this.skillGroupList.sort((a, b) => a.groupName.localeCompare(b.groupName));
  }

  updateTimeInProgress(): void {
    for (const next of this.currentQueue) {
      next['timeProgress'] = this.skillTimeProgress(next);
    }
  }

  setTabFromRoute(): void {
    const params = this.router.parseUrl(this.location.path()).queryParams;
    if (params['side']) {
      this.tabView = parseInt(params['side'], 10);
    }
    if (params['hide']) {
      this.hideUntrained = parseInt(params['hide'], 10) === 1;
    }
  }

  updateHide(event: MatCheckboxChange): void {
    const url = this
      .router
      .createUrlTree(['/apps/skillmon'],
        {
          queryParams: {'tab': this.selectedTab, 'side': this.tabView, 'hide': event.checked ? 1 : 0}, relativeTo: this.routeInfo
        })
      .toString();

    this.location.go(url);
  }

  updateRoute(event: MatTabChangeEvent): void {
    this.tabView = event.index;
    const url = this
      .router
      .createUrlTree(['/apps/skillmon'],
        {
          queryParams: {'tab': this.selectedTab, 'side': event.index, 'hide': this.hideUntrained ? 1 : 0}, relativeTo: this.routeInfo
        })
      .toString();

    this.location.go(url);
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

  skillTimeProgress(target: SkillInQueue): number {
    if (target.endTime === 0) {
      // paused, progress always based on current skill points
      return 0;
    }
    const now = Date.now();
    if (now < target.startTime) {
      return 0;
    }
    if (now > target.endTime) {
      return 100;
    }
    return (now - target.startTime) / (target.endTime - target.startTime) * 100;
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
        next['timeProgress'] = 0;
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
    this.loading = true;
    forkJoin(
      this.commonModelService.getAccountBalance(this.access.accessKey, this.access.credential),
      this.charModelService.getCharacterSheets(this.access.accessKey, this.access.credential),
      this.charModelService.getCharacterSheetAttributes(this.access.accessKey, this.access.credential),
      this.charModelService.getSkillPoints(this.access.accessKey, this.access.credential),
      this.charModelService.getSkillsInQueue(this.access.accessKey, this.access.credential)
    ).subscribe(
      results => {
        this.loading = false;
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
        this.loading = false;
        this.dialog.makeWarnDialog('Character Details Error', 'Unable to retrieve character details for \'' +
          this.account.eveCharacterName + '\'.  Please verify the access key still has the appropriate privileges.  Reload this ' +
          'page to try again.  Please contact the site admin if this problem persists.');
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
    this.loading = true;
    this.charModelService.getSkills(this.access.accessKey, this.access.credential, undefined, contid)
      .subscribe(
        results => {
          this.loading = false;
          this.knownSkills = this.knownSkills.concat(results);
          if (results.length > 0) {
            const last = results.pop();
            this.retrieveSkills(last.cid);
          }
        },
        () => {
          this.loading = false;
          this.dialog.makeWarnDialog('Character Skills Error', 'Unable to retrieve character skills for \'' +
            this.account.eveCharacterName + '\'.  Please verify the access key still has the appropriate privileges.  Reload this ' +
            'page to try again.  Please contact the site admin if this problem persists.');
        }
      );
  }

  retrieveHeritage(): void {
    this.loading = true;
    forkJoin(
      this.charSDEService.getRaces(-1, 1000, '{values:[' + String(this.charSheet.raceID) + ']}'),
      this.charSDEService.getBloodlines(-1, 1000, '{values:[' + String(this.charSheet.bloodlineID) + ']}')
    ).subscribe(
      results => {
        this.loading = false;
        // Extract race
        this.race = results[0].length === 1 ? results[0][0].raceName : '';
        // Extract bloodline
        this.bloodline = results[1].length === 1 ? results[1][0].bloodlineName : '';
      },
      () => {
        this.loading = false;
        this.dialog.makeWarnDialog('Character Heritage  Error', 'Unable to retrieve character heritage for \'' +
          this.account.eveCharacterName + '\'.  Please verify the access key still has the appropriate privileges.  Reload this ' +
          'page to try again.  Please contact the site admin if this problem persists.');
      }
    );
  }
}
