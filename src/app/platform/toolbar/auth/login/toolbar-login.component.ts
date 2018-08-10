import {Component} from '@angular/core';

@Component({
  selector: 'app-toolbar-login',
  templateUrl: './toolbar-login.component.html',
  styleUrls: ['auth-buttons.css', './toolbar-login.component.css']
})
export class ToolbarLoginComponent {

  constructor() { }

  startAuth(tp: string): void {
    window.location.assign('/api/ws/v1/auth/login/' + tp);
  }

}
