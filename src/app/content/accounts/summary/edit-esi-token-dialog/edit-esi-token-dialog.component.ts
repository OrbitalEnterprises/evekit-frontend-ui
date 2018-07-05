import {Component, Inject} from '@angular/core';
import {AccountService, CredentialService, ESIScopeDescription, SynchronizedEveAccount} from '../../../../platform-service-api';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {CreateSyncAccountComponent} from '../../../../platform/menu/create-sync-account/create-sync-account.component';
import {AppState} from '../../../../store/store-model';
import {Store} from '@ngrx/store';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {refreshSyncAccounts} from '../../../../platform/version/account-tools';
import {DialogsService} from '../../../../platform/dialogs.service';

class ESIScopePair {
  constructor(public name: string, public description: string) {
  }
}

@Component({
  selector: 'app-edit-esi-token-dialog',
  templateUrl: './edit-esi-token-dialog.component.html',
  styleUrls: ['./edit-esi-token-dialog.component.css', '../../accounts-view.component.css']
})
export class EditEsiTokenDialogComponent {
  // Either 'Add' or 'Edit'
  esiEditMode = 'Add';
  account: SynchronizedEveAccount;
  endpoints: ESIScopeDescription[] = [];
  esiScopePairs: ESIScopePair[] = [];
  esiScopeControls: FormArray = new FormArray([]);
  formModel: FormGroup = new FormGroup({
    scopes: this.esiScopeControls
  });

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              private dialogRef: MatDialogRef<EditEsiTokenDialogComponent>,
              private store: Store<AppState>,
              private dialog: DialogsService,
              private acctService: AccountService,
              private credsService: CredentialService) {
    this.esiEditMode = data['editMode'];
    this.account = data['account'];
    const endpointFn = this.account.characterType ?
      () => this.acctService.charEndpoints() :
      () => this.acctService.corpEndpoints();
    endpointFn().subscribe(
      scopes => {
        this.endpoints = scopes;
        const selected: Set<string> = new Set<string>();
        if (this.esiEditMode === 'Edit') {
          for (const next of this.account.scopes.split(' ')) {
            selected.add(next);
          }
        }
        for (const ep of this.endpoints) {
          this.esiScopePairs.push(new ESIScopePair(ep.scope, ep.description));
          this.esiScopeControls.push(new FormControl(selected.has(ep.scope)));
        }
      },
      () => {
        this.dialog.makeWarnDialog('Unable to Retrieve Scope List',
          'Unable to retrieve scope list from server.  Please try again.  If this problem persists, please contact the administrator.')
          .afterClosed().subscribe(
          () => {
            this.dialogRef.close();
          }
        );
      }
    );
  }

  selectAllScopes(): void {
    for (const control of this.esiScopeControls.controls) {
      control.setValue(true);
    }
  }

  clearAllScopes(): void {
    for (const control of this.esiScopeControls.controls) {
      control.setValue(false);
    }
  }

  save(): void {
    // Extract selected scopes
    const requestedScopes: string[] = [];
    for (let i = 0; i < this.esiScopePairs.length; i++) {
      if (this.esiScopeControls.controls[i].value) {
        requestedScopes.push(this.esiScopePairs[i].name);
      }
    }

    // Add credential
    this.credsService.setESICredential(this.account.aid, requestedScopes.join(' '))
      .subscribe(
        result => {
          // Close and redirect to authorize change
          this.dialogRef.close();
          window.location.assign(result['newLocation']);
        },
        () => {
          // Error
          this.dialogRef.close();
          this.dialog.makeWarnDialog(`${this.esiEditMode} ESI Token Failed`,
            'Failed to set ESI token.  Please try again.  If this problem persists, please contact the administrator.')
            .afterClosed().subscribe(
            () => {
              refreshSyncAccounts(this.account.userAccount, this.acctService, this.store);
            }
          );
        }
      );
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
