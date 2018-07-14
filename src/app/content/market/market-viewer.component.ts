import {Component} from '@angular/core';
import {environment} from '../../../environments/environment';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-market-viewer',
  templateUrl: './market-viewer.component.html',
  styleUrls: ['./market-viewer.component.css']
})
export class MarketViewerComponent {

  trustedURL: SafeResourceUrl = null;

  constructor(private sanitizer: DomSanitizer) {
    const url = '/assets/swagger-ui-3.17.2/index.html?url=' + environment.marketViewURL;
    this.trustedURL = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
