import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {getCookie, QS_MAIN_COOKIE_NAME} from './platform/cookies';
import {DialogsService} from './platform/dialogs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  authError: string = null;

  constructor(private router: Router,
              private dialogService: DialogsService) {
    // Capture any errors from previous load
    const activated = router.routerState.snapshot.root;
    if (activated.queryParamMap.has('auth_error')) {
      this.authError = activated.queryParamMap.get('auth_error');
    }
  }

  startQuickstart(): void {
    this.router.navigate(['/qs']);
  }

  ngOnInit(): void {
    // If there was an error from the last load, display it
    if (this.authError !== null) {
      this.dialogService.makeWarnDialog('Error on Last Interaction', this.authError);
    }

    // Update path if we should be on the quickstart
    if (getCookie(QS_MAIN_COOKIE_NAME) !== '') {
      this.startQuickstart();
    }
  }
}
