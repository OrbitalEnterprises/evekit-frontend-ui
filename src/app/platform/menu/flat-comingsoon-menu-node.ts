import {FlatMenuNode} from './flat-menu-node';

/**
 * A node that should be shown, but can't be selected.
 */
export class FlatComingSoonMenuNode extends FlatMenuNode {

  constructor(level: number, public name: string, public icon: string, public img: string) {
    super(level, false);
  }
}
