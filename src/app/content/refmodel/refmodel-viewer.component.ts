import {Component} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-refmodel-viewer',
  templateUrl: './refmodel-viewer.component.html',
  styleUrls: ['./refmodel-viewer.component.css']
})
export class RefmodelViewerComponent {

  trustedURL: SafeResourceUrl = null;

  constructor(private sanitizer: DomSanitizer) {
    const url = '/assets/swagger-ui-3.17.2/index.html?url=' + environment.refViewURL;
    this.trustedURL = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
