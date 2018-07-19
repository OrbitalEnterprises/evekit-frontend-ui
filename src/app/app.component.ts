import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {getCookie, QS_MAIN_COOKIE_NAME} from './platform/cookies';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {
  }

  startQuickstart(): void {
    this.router.navigate(['/qs']);
  }

  ngOnInit(): void {
    // Update path if we should be on the quickstart
    if (getCookie(QS_MAIN_COOKIE_NAME) !== '') {
      this.startQuickstart();
    }
  }
}
