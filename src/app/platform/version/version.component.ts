import { Component, OnInit } from '@angular/core';
import {SetBuild, SetVersion, VersionInfo} from '../../store/version-model';
import {Store, select, createSelector, createFeatureSelector} from '@ngrx/store';
import {Observable} from 'rxjs';
import {ReleaseService} from '../../platform-service-api';
import {AppState} from '../../store/store-model';

const selectVersionInfo = createFeatureSelector<VersionInfo>('version');
const selectVersion = createSelector(
  selectVersionInfo,
  (state: VersionInfo) => state.version
);
const selectBuildDate = createSelector(
  selectVersionInfo,
  (state: VersionInfo) => state.buildDate
);

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.css']
})
export class VersionComponent implements OnInit {
  version$: Observable<string>;
  build$: Observable<string>;
  year: string;

  constructor(private store: Store<AppState>, private release: ReleaseService ) {
    this.version$ = store.pipe(select(selectVersion));
    this.build$ = store.pipe(select(selectBuildDate));
    this.year = String((new Date()).getFullYear());
  }

  ngOnInit() {
    // Periodically retrieve and populate version info.
    this.refreshVersion();
    this.refreshBuild();
    setInterval(() => {
      this.refreshVersion();
      this.refreshBuild();
    }, 10 * 60000);
  }

  private refreshVersion() {
    this.release.version('body').subscribe(
      u => {
        if (u !== null) {
          this.store.dispatch(new SetVersion(u['version']));
        }
      }
    );
  }

  private refreshBuild() {
    this.release.buildDate('body').subscribe(
      u => {
        if (u !== null) {
          this.store.dispatch(new SetBuild(u['buildDate']));
        }
      }
    );
  }

}
