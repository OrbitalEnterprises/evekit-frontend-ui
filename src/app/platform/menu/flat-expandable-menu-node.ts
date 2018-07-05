import {FlatMenuNode} from './flat-menu-node';

export class FlatExpandableMenuNode extends FlatMenuNode {

  constructor(level: number, public name: string, public icon: string, public img: string) {
    super(level, true);
  }

}
