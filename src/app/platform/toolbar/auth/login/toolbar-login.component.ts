import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-toolbar-login',
  templateUrl: './toolbar-login.component.html',
  styleUrls: ['auth-buttons.css', './toolbar-login.component.css']
})
export class ToolbarLoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  startAuth(tp: string) {
    window.location.assign('/api/ws/v1/auth/login/' + tp);
  }

}
