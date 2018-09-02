import {Component, OnDestroy} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../environments/environment';
import {AccountService, SynchronizedAccountAccessKey, SynchronizedEveAccount} from '../../platform-service-api';
import {AppState} from '../../store/store-model';
import {Store} from '@ngrx/store';
import {selectSyncAccounts} from '../../platform/selectors';
import {Location} from '@angular/common';

class KeyMenuEntry {
  constructor(public aid: number, public kid: number, public title: string) {
  }
}

@Component({
  selector: 'app-sync-model-viewer',
  templateUrl: './sync-model-viewer.component.html',
  styleUrls: ['./sync-model-viewer.component.css']
})
export class SyncModelViewerComponent implements OnDestroy {
  accountList: SynchronizedEveAccount[] = [];
  keyMap: Map<number, SynchronizedAccountAccessKey[]> = new Map<number, SynchronizedAccountAccessKey[]>();
  viewAID = -1;
  viewKID = -1;
  keyMenuList: KeyMenuEntry[] = [];
  title: string = null;
  isChar = false;
  trustedURLString: string = null;
  trustedURL: SafeResourceUrl = null;
  syncAccountSub = null;
  routeSub = null;

  constructor(private routeInfo: ActivatedRoute,
              private sanitizer: DomSanitizer,
              private store: Store<AppState>,
              private acctService: AccountService,
              private location: Location) {
    this.updateSource();
    this.syncAccountSub = this.store.select(selectSyncAccounts).subscribe(
      next => {
        this.accountList = [];

        // Look for map keys which are no longer in the account list
        // These should be removed.  We do things this way to avoid
        // a gratuitous frame reload because of map updates.
        const prevKeys = this.keyMap.keys();
        const toRemove = [];
        for (let i = prevKeys.next(); !i.done; i = prevKeys.next()) {
          let old = true;
          for (const acct of next) {
            if (acct.aid === i.value) {
              old = false;
              break;
            }
          }
          if (old) {
            toRemove.push(i);
          }
        }
        for (const i of toRemove) {
          this.keyMap.delete(i);
        }

        // Retrieve the access key list for each sync account
        // and store it in the map.
        for (const acct of next) {
          this.accountList.push(acct);
          this.acctService.getAccessKey(-1, acct.aid, -1)
            .subscribe(
              keyList => {
                this.keyMap.set(acct.aid, keyList);
                this.updateSource();
                this.updateKeyMenu();
              });
        }
      }
    );
    this.routeSub = this.routeInfo.paramMap.subscribe(
      next => {
        let dirty = false;
        if (next.has('aid')) {
          this.viewAID = parseInt(next.get('aid'), 10);
          dirty = true;
        }
        if (next.has('kid')) {
          this.viewKID = parseInt(next.get('kid'), 10);
          dirty = true;
        }
        if (dirty) {
          this.updateSource();
        }
      }
    );
  }

  updateKeyMenu(): void {
    this.keyMenuList = [];
    for (const acct of this.accountList) {
      if (this.keyMap.has(acct.aid)) {
        for (const akey of this.keyMap.get(acct.aid)) {
          this.keyMenuList.push(new KeyMenuEntry(acct.aid, akey.kid,
            'Account: "' + acct.name + '" Key: "' + akey.keyName + '"'));
        }
      }
    }
  }

  selectKey(aid: number, kid: number) {
    this.viewAID = aid;
    this.viewKID = kid;
    this.updateSource();
  }

  updateSource(): void {
    this.title = null;
    let key: string = null;
    let hash: string = null;
    let url = '/assets/swagger-ui-3.17.2/index.html?url=' + environment.modelViewURL;
    if (this.viewAID !== -1 && this.viewKID !== -1) {
      // Attempt to find account and key info
      keyFound:
        for (const acct of this.accountList) {
          if (acct.aid === this.viewAID) {
            if (this.keyMap.has(acct.aid)) {
              for (const akey of this.keyMap.get(acct.aid)) {
                if (akey.kid === this.viewKID) {
                  this.title = 'Account: "' + acct.name + '" Key: "' + akey.keyName + '"';
                  key = String(akey.accessKey);
                  hash = akey.credential;
                  this.isChar = acct.characterType;
                  const curLoc = this.location.path();
                  const newLoc = `/sapi/model/${acct.aid}/${akey.kid}`;
                  if (curLoc !== newLoc) {
                    this.location.go(newLoc);
                  }
                  break keyFound;
                }
              }
            }
          }
        }
    }
    if (key !== null && hash !== null) {
      url += '&key=' + key + '&hash=' + hash;
    }
    if (this.trustedURLString !== url) {
      this.trustedURLString = url;
      this.trustedURL = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }

  ngOnDestroy(): void {
    if (this.syncAccountSub !== null) {
      this.syncAccountSub.unsubscribe();
    }
    if (this.routeSub !== null) {
      this.routeSub.unsubscribe();
    }
  }
}
