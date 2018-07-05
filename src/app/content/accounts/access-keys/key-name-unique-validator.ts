import {SynchronizedAccountAccessKey} from '../../../platform-service-api';
import {ValidatorFn} from '@angular/forms';
import {AbstractControl} from '@angular/forms/src/model';

export function KeyNameUniqueValidator(keyList: SynchronizedAccountAccessKey[]): ValidatorFn {
  return (control: AbstractControl) => {
    const value = control.value;
    for (const key of keyList) {
      if (key.keyName === value) {
        return { 'keyNameUnique': true };
      }
    }
    return null;
  };
}
