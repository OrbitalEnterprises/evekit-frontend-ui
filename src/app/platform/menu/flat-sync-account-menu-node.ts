import {FlatMenuNode} from './flat-menu-node';

export class FlatSyncAccountMenuNode extends FlatMenuNode {

  constructor(level: number, public name: string, public route: string, public img: string,
              public aid: number, public charType: boolean) {
    super(level, false);
  }
}
