import {Component, Inject} from '@angular/core';
import {AccountService, SynchronizedEveAccount} from '../../../../platform-service-api';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DialogsService} from '../../../../platform/dialogs.service';

class ESIScopePair {
  constructor(public name: string, public description: string) {
  }
}

@Component({
  selector: 'app-view-scopes-dialog',
  templateUrl: './view-scopes-dialog.component.html',
  styleUrls: ['./view-scopes-dialog.component.css', '../../accounts-view.component.css']
})
export class ViewScopesDialogComponent {
  account: SynchronizedEveAccount;
  esiScopePairs: ESIScopePair[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              private dialogRef: MatDialogRef<ViewScopesDialogComponent>,
              private dialog: DialogsService,
              private acctService: AccountService) {
    this.account = data;
    const endpointFn = this.account.characterType ?
      () => this.acctService.charEndpoints() :
      () => this.acctService.corpEndpoints();
    endpointFn().subscribe(
      endpoints => {
        const selected: Set<string> = new Set<string>();
        for (const next of this.account.scopes.split(' ')) {
          selected.add(next);
        }
        for (const ep of endpoints) {
          if (selected.has(ep.scope)) {
            this.esiScopePairs.push(new ESIScopePair(ep.scope, ep.description));
          }
        }
      },
      () => {
        this.dialog.displayGenericUserError('Unable to Retrieve Scope List',
          'Unable to retrieve scope list from server')
          .afterClosed().subscribe(
          () => {
            this.dialogRef.close();
          }
        );
      }
    );

  }

  ok(): void {
    this.dialogRef.close();
  }
}
