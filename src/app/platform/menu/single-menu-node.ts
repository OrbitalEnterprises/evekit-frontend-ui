import {MenuNode} from './menu-node';

/**
 * This node type represents a selectable top-level entity which,
 * when selected, will transition to the given route.  Both the icon
 * and img are optional.  If the icon is present, then it is rendered,
 * otherwise the img will be rendered (if present).
 */
export class SingleMenuNode extends MenuNode {
  constructor(public name: string, public route: string, public icon: string, public img: string) {
    super();
  }
}
