import {SynchronizedEveAccount} from '../../../platform-service-api';
import {ValidatorFn} from '@angular/forms';
import {AbstractControl} from '@angular/forms/src/model';

export function AccountNameUniqueValidator(accountList: SynchronizedEveAccount[]): ValidatorFn {
  return (control: AbstractControl) => {
    const value = control.value;
    for (const account of accountList) {
      if (account.name === value) {
        return { 'accountNameUnique': true };
      }
    }
    return null;
  };
}
