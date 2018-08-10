import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-accounts-view',
  templateUrl: './accounts-view.component.html',
  styleUrls: ['./accounts-view.component.css']
})
export class AccountsViewComponent {
  aid: number;

  constructor(private routeInfo: ActivatedRoute) {
    this.routeInfo.paramMap.subscribe(
      next => {
        this.aid = parseInt(next.get('aid'), 10);
      }
    );
  }

}
