import {Component} from '@angular/core';
import {AdminService} from '../../platform-service-api';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

class SDEEntry {
  constructor(public title: string, public modelURL: string) {
  }
}

@Component({
  selector: 'app-sde-viewer',
  templateUrl: './sde-viewer.component.html',
  styleUrls: ['./sde-viewer.component.css']
})
export class SdeViewerComponent {
  sdeList: SDEEntry[] = [];
  sdeMap: Map<string, any> = new Map<string, any>();
  title: string = null;
  modelURL: string = null;
  trustedURL: SafeResourceUrl = null;

  constructor(private sanitizer: DomSanitizer,
              private adminService: AdminService) {
    adminService.getConfigProperty('sdeReleases')
      .subscribe(
        next => {
          const releaseList: string[] = JSON.parse(next.propertyValue);
          for (const relName of releaseList) {
            adminService.getConfigProperty('sde.release.' + relName)
              .subscribe(
                relObject => {
                  this.sdeMap.set(relName, JSON.parse(relObject.propertyValue));
                  this.updateSDEList();
                }
              );
          }
        }
      );
  }

  updateSDEList(): void {
    this.sdeList = [];
    this.sdeMap.forEach(
      (val, key) => {
        this.sdeList.push(new SDEEntry('Release ' + key, val['model']));
      });
    this.sdeList.sort((a, b) => {
      if (a.title < b.title) { return - 1; }
      if (a.title > b.title) { return 1; }
      return 0;
    });
  }

  selectSDE(entry: SDEEntry) {
    this.title = entry.title;
    this.modelURL = entry.modelURL;
    this.updateSource();
  }

  updateSource(): void {
    if (this.modelURL !== null) {
      const url = '/assets/swagger-ui-3.17.2/index.html?url=' + this.modelURL;
      this.trustedURL = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }

}
