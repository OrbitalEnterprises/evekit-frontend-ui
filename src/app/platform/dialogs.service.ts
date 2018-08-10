import {Component, Inject, Injectable} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-standard-dialog',
  template: `
    <h3 class="{{ data.color }}" mat-dialog-title style="padding: 3px;">{{ data.title }}</h3>
    <mat-dialog-content class="mat-typography">{{ data.message }}</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>OK</button>
    </mat-dialog-actions>`
})
export class StandardDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

}

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h3 class="{{ data.color }}" mat-dialog-title style="padding: 3px;">{{ data.title }}</h3>
    <mat-dialog-content class="mat-typography">{{ data.message }}</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false">Cancel</button>
      <button mat-button [mat-dialog-close]="true">OK</button>
    </mat-dialog-actions>`
})
export class ConfirmDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

}

@Injectable({
  providedIn: 'root'
})
export class DialogsService {

  constructor(private dialog: MatDialog) { }

  makeInfoDialog(title: string, msg: string): MatDialogRef<StandardDialogComponent> {
    return this.dialog.open(StandardDialogComponent, {
      data: {
        title: title,
        message: msg,
        color: 'ek-label-bk-primary'
      }
    });
  }

  makeWarnDialog(title: string, msg: string): MatDialogRef<StandardDialogComponent> {
    return this.dialog.open(StandardDialogComponent, {
      data: {
        title: title,
        message: msg,
        color: 'ek-label-bk-warn'
      }
    });
  }

  makeConfirmDialog(title: string, msg: string): MatDialogRef<ConfirmDialogComponent> {
    return this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: title,
        message: msg,
        color: 'ek-label-bk-warn'
      }
    });
  }

  displayGenericUserError(title: string, msg: string): MatDialogRef<StandardDialogComponent> {
    return this.makeWarnDialog(title, msg + ', please try again.  If this problem persists, please contact site admin.');
  }


}
