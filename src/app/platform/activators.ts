import {EveKitUserAccount} from '../platform-service-api';
import {Store} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {selectUserAccount} from './selectors';
import {AppState} from '../store/store-model';

@Injectable()
export class AdminActivator implements CanActivate {
  account: EveKitUserAccount;

  constructor(private store: Store<AppState>) {
    store.select(selectUserAccount).subscribe(next => {
      this.account = next;
    });
  }

  canActivate(): boolean {
    return this.account != null && this.account.admin;
  }

}

@Injectable()
export class LoggedInActivator implements CanActivate {
  account: EveKitUserAccount;

  constructor(private store: Store<AppState>) {
    store.select(selectUserAccount).subscribe(next => {
      this.account = next;
    });
  }

  canActivate(): boolean {
    return this.account != null;
  }

}

@Injectable()
export class RedirectToInfoGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(): boolean {
    this.router.navigate(['/info']);
    return false;
  }
}
