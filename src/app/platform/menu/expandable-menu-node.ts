import {MenuNode} from './menu-node';

/**
 * A non-selectable node which can be expanded to reveal children nodes.
 */
export class ExpandableMenuNode extends MenuNode {

  constructor(public name: string, public icon: string, public img: string) {
    super();
  }

}
