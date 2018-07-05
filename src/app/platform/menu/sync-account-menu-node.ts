import {MenuNode} from './menu-node';

export class SyncAccountMenuNode extends MenuNode {
  constructor(public name: string, public route: string, public img: string,
              public aid: number, public charType: boolean) {
    super();
  }
}
