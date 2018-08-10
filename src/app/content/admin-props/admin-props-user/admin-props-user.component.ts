import {Component} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {AccountService, AdminService, EveKitUserAccount, EveKitUserAuthSource, PersistentProperty} from '../../../platform-service-api';
import {faSave, faTrash} from '@fortawesome/free-solid-svg-icons';
import {DialogsService} from '../../../platform/dialogs.service';

@Component({
  selector: 'app-admin-props-user',
  templateUrl: './admin-props-user.component.html',
  styleUrls: ['./admin-props-user.component.css']
})
export class AdminPropsUserComponent {
  userList: EveKitUserAccount[] = [];
  selectedUser: EveKitUserAccount = null;
  userSourceMap: Map<number, EveKitUserAuthSource> = new Map<number, EveKitUserAuthSource>();
  props: PersistentProperty[] = [];
  propControls: FormArray = new FormArray([]);
  newKeyControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(1)
  ]);
  newValueControl: FormControl = new FormControl('');
  formModel: FormGroup = new FormGroup({
    propList: this.propControls,
    newKey: this.newKeyControl,
    newValue: this.newValueControl
  });

  // icons
  icSave = faSave;
  icDelete = faTrash;

  constructor(private adminService: AdminService,
              private accountService: AccountService,
              private dialogService: DialogsService) {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userList = [];
    this.accountService.listUsers()
      .subscribe(
        ul => {
          this.userList = ul;
          for (const next of ul) {
            this.accountService.getUserLastSource(parseInt(next.uid, 10))
              .subscribe(
                lastSource => {
                  if (lastSource !== null) {
                    this.userSourceMap.set(parseInt(next.uid, 10), lastSource);
                  }
                }
              );
          }
        },
        err => {
          this.dialogService.makeWarnDialog('Failed to List Users',
            `Failed to retrieve user list with error: ${err.errorMessage}.`);
        }
      );
  }

  selectUser(user: EveKitUserAccount): void {
    this.selectedUser = user;
    this.loadProperties();
  }

  makeDisplayableUser(user: EveKitUserAccount): string {
    const uid = parseInt(user.uid, 10);
    let display = `UID: ${user.uid} LOGIN: `;
    if (this.userSourceMap.has(uid)) {
      const mp = this.userSourceMap.get(uid);
      display = display + `${mp.screenName} (${mp.source})`;
    } else {
      display = display + 'never logged in';
    }
    return display;
  }

  loadProperties(): void {
    this.props = [];
    if (this.selectedUser === null) {
      return;
    }
    this.adminService.getUserProps(parseInt(this.selectedUser.uid, 10))
      .subscribe(
        props => {
          this.props = props;
          this.propControls.controls = [];
          for (const next of props) {
            this.propControls.push(new FormControl(next.propertyValue));
          }
        },
        err => {
          this.dialogService.makeWarnDialog('Failed to Retrieve User Property List',
            `Failed to retrieve user property list with error: ${err.errorMessage}.`);
        }
      );
  }

  saveProperty(): void {
    this.saveUserProp(this.newKeyControl.value, this.newValueControl.value);
  }

  saveChange(index: number): void {
    this.saveUserProp(this.props[index].propertyName, this.propControls.controls[index].value);
  }

  saveUserProp(key: string, value: string): void {
    if (this.selectedUser == null) {
      this.dialogService.makeWarnDialog('No User Selected',
        'Please select a user before saving this property.');
      return;
    }
    this.adminService.setUserProp(parseInt(this.selectedUser.uid, 10), key, value)
      .subscribe(
        () => {
          this.loadProperties();
        },
        err => {
          this.dialogService.makeWarnDialog('Failed to Save Property Change',
            `Failed to save property change with error: ${err.errorMessage}.`);
        }
      );
  }

  deleteProp(index: number): void {
    if (this.selectedUser == null) {
      this.dialogService.makeWarnDialog('No User Selected',
        'Please select a user before deleting this property.');
      return;
    }
    const key = this.props[index].propertyName;
    this.adminService.deleteUserProp(parseInt(this.selectedUser.uid, 10), key)
      .subscribe(
        () => {
          this.loadProperties();
        },
        err => {
          this.dialogService.makeWarnDialog('Failed to Delete Property',
            `Failed to delete property with error: ${err.errorMessage}.`);
        }
      );
  }

}
