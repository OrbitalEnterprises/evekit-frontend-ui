import {Component} from '@angular/core';
import {AppState} from '../../store/store-model';
import {select, Store} from '@ngrx/store';
import {selectUserAccount} from '../selectors';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  loggedIn: boolean;

  constructor(private store: Store<AppState>) {
    // Convenience boolean which indicates our current auth status
    store.pipe(select(selectUserAccount)).subscribe(
      u => {
        this.loggedIn = u != null;
      },
      () => {
        this.loggedIn = false;
      }
    );
  }

}
