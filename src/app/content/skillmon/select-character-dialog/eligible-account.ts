import {SynchronizedAccountAccessKey, SynchronizedEveAccount} from '../../../platform-service-api';

export class EligibleAccount {
  constructor(public account: SynchronizedEveAccount, public access: SynchronizedAccountAccessKey) {}
}
