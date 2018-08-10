import {Component} from '@angular/core';
import {AdminService, PersistentProperty} from '../../../platform-service-api';
import {faSave, faTrash} from '@fortawesome/free-solid-svg-icons';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {DialogsService} from '../../../platform/dialogs.service';

@Component({
  selector: 'app-admin-props-system',
  templateUrl: './admin-props-system.component.html',
  styleUrls: ['./admin-props-system.component.css']
})
export class AdminPropsSystemComponent {
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
              private dialogService: DialogsService) {
    this.loadProperties();
  }

  loadProperties(): void {
    this.props = [];
    this.adminService.getSysProps()
      .subscribe(
        props => {
          this.props = props;
          this.propControls.controls = [];
          for (const next of props) {
            this.propControls.push(new FormControl(next.propertyValue));
          }
        },
        err => {
          this.dialogService.makeWarnDialog('Failed to Retrieve System Properties',
            `Failed to retrieve system properties with error: ${err.errorMessage}.`)
            .afterClosed().subscribe(
            () => {
              this.loadProperties();
            }
          );
        }

      );
  }

  saveProperty(): void {
    this.saveSysProp(this.newKeyControl.value, this.newValueControl.value);
  }

  saveChange(index: number): void {
    this.saveSysProp(this.props[index].propertyName, this.propControls.controls[index].value);
  }

  saveSysProp(key: string, value: string): void {
    this.adminService.setSysProp(key, value)
      .subscribe(
        () => {
          this.loadProperties();
        },
        err => {
          this.dialogService.makeWarnDialog('Failed to Save Property Change',
            `Failed to save property change with error: ${err.errorMessage}.`)
            .afterClosed().subscribe(
            () => {
              this.loadProperties();
            }
          );
        }
      );
  }

  deleteProp(index: number): void {
    const key = this.props[index].propertyName;
    this.adminService.deleteSysProp(key)
      .subscribe(
        () => {
          this.loadProperties();
        },
        err => {
          this.dialogService.makeWarnDialog('Failed to Delete Property',
            `Failed to delete property with error: ${err.errorMessage}.`)
            .afterClosed().subscribe(
            () => {
              this.loadProperties();
            }
          );
        }
      );
  }

}
