import {FlatMenuNode} from './flat-menu-node';

export class FlatCallbackMenuNode extends FlatMenuNode {

  constructor(level: number, public name: string, public callback: () => void, public icon: string, public img: string) {
    super(level, false);
  }
}
