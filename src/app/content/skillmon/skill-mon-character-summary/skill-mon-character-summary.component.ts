import {Component, Input, OnChanges, OnDestroy} from '@angular/core';
import {AccountService, SynchronizedAccountAccessKey, SynchronizedEveAccount} from '../../../platform-service-api';
import {ModelCharacterService, ModelCommonService, SkillInQueue} from '../../../model-service-api';
import {Observable, Subscription} from 'rxjs';
import {SkillTree} from '../skill-mon-character-view/skill-tree';
import {DialogsService} from '../../../platform/dialogs.service';

export function formatLevel(level: number): string {
  switch (level) {
    case 1:
      return 'I';
    case 2:
      return 'II';
    case 3:
      return 'III';
    case 4:
      return 'IV';
    default:
      return 'V';
  }
}

@Component({
  selector: 'app-skill-mon-character-summary',
  templateUrl: './skill-mon-character-summary.component.html',
  styleUrls: ['./skill-mon-character-summary.component.css']
})
export class SkillMonCharacterSummaryComponent implements OnChanges, OnDestroy {
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
  secondWatcher: Subscription = null;

  // Summary properties
  balance: number;
  skillTrainingName: string;
  skillTrainingDoneTime = -1;
  paused = false;
  formattedFinish: string;
  empty = false;
  skillQueueDoneTime = -1;
  formattedQueueFinish: string;

  constructor(private dialog: DialogsService,
              private accountService: AccountService,
              private commonModelService: ModelCommonService,
              private charModelService: ModelCharacterService) {
  }

  ngOnDestroy(): void {
    if (this.secondWatcher != null) {
      this.secondWatcher.unsubscribe();
    }
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
            this.dialog.makeWarnDialog('Access Key Error', 'Error retrieving access key for \'' +
              this.account.eveCharacterName + '\'.  Please reload page to try again.  If problems persist, please contact the site admin.');
          }
        },
        () => {
          this.dialog.makeWarnDialog('Access Key Error', 'Error retrieving access key for \'' +
            this.account.eveCharacterName + '\'.  Please reload page to try again.  If problems persist, please contact the site admin.');
        }
      );
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
      result += String(days) + 'd, ';
    }
    if (days > 0 || hours > 0) {
      result += String(hours) + 'h, ';
    }
    if (days > 0 || hours > 0 || minutes > 0) {
      result += String(minutes) + 'm, ';
    }
    result += String(seconds) + 's';
    return result;
  }

  update(): void {
    // Update account balance
    this.commonModelService.getAccountBalance(this.access.accessKey, this.access.credential)
      .subscribe(
        result => {
          if (result.length === 1) {
            this.balance = result[0].balance;
          } else {
            this.dialog.makeWarnDialog('Account Balance Error', 'Unable to retrieve account balance for \'' +
              this.account.eveCharacterName + '\'.  Please verify the specified access key still has the required privileges.  Reload ' +
              'this page to try again.  Please contact the site admin if this problem persists.');
          }
        },
        () => {
          this.dialog.makeWarnDialog('Account Balance Error', 'Unable to retrieve account balance for \'' +
            this.account.eveCharacterName + '\'.  Please verify the specified access key still has the required privileges.  Reload ' +
            'this page to try again.  Please contact the site admin if this problem persists.');
        }
      );
    // Update training skill info
    this.charModelService.getSkillsInQueue(this.access.accessKey, this.access.credential)
      .subscribe(
        result => {
          if (result.length === 0) {
            this.skillTrainingName = null;
            this.skillTrainingDoneTime = -1;
            this.empty = true;
            this.paused = false;
            return;
          }

          // Queue only updated when user logs in.  If user hasn't logged in for a while, there may be
          // several older entries still in queue.  We eliminate those here.
          const process: Array<SkillInQueue> = [];
          const now = Date.now();
          for (const next of result) {
            if (next.endTime === 0 || next.endTime > now) {
              process.push(next);
            }
          }
          if (process.length === 0) {
            this.empty = true;
            this.paused = false;
            return;
          }

          // Queue not always numbered from 1, much less in order.  Use the lowest numbered item in the queue.
          let index: SkillInQueue = null;
          this.paused = true;
          this.empty = false;
          for (const next of process) {
            if (index === null && next.endTime > now) {
              index = next;
            } else if (index !== null && next.queuePosition < index.queuePosition && next.endTime > now) {
              index = next;
            }
          }

          if (index != null) {
            this.paused = false;

            // Determine when the entire queue will finish.
            this.skillQueueDoneTime = index.endTime;
            for (const next of process) {
              if (next.endTime > this.skillQueueDoneTime) {
                this.skillQueueDoneTime = next.endTime;
              }
            }
            this.formattedQueueFinish = this.formatFinishTime(now, this.skillQueueDoneTime);

            // Resolve the current training time and finish time
            if (this.skillTree === null || !this.skillTree.skillList.has(index.typeID)) {
              return;
            }
            this.skillTrainingName = this.skillTree.skillList.get(index.typeID).typeName + ' ' + formatLevel(index.level);
            this.skillTrainingDoneTime = index.endTime;
            this.formattedFinish = this.formatFinishTime(Date.now(), index.endTime);
            this.secondWatcher = this.secondTimer.subscribe(
              () => {
                let ts = Date.now();
                if (ts > index.endTime) {
                  ts = index.endTime;
                }
                this.formattedFinish = this.formatFinishTime(ts, index.endTime);
                this.formattedQueueFinish = this.formatFinishTime(ts, this.skillQueueDoneTime);
              }
            );
          }
        },
        () => {
          this.dialog.makeWarnDialog('Skill Queue Error', 'Unable to retrieve skill queue for \'' +
            this.account.eveCharacterName + '\'.  Please verify the specified access key still has the required privileges.  Reload ' +
            'this page to try again.  Please contact the site admin if this problem persists.');
        }
      );
  }

}
