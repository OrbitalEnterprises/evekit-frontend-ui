import {FlatMenuNode} from './flat-menu-node';

export class FlatSingleMenuNode extends FlatMenuNode {

  constructor(level: number, public name: string, public route: string, public icon: string, public img: string) {
    super(level, false);
  }
}
