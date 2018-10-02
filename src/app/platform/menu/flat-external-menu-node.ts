import {FlatMenuNode} from './flat-menu-node';

/**
 * A node that opens a link in a new tab.
 */
export class FlatExternalMenuNode extends FlatMenuNode {

  constructor(level: number, public name: string, public icon: string, public img: string, public url: string) {
    super(level, false);
  }
}
