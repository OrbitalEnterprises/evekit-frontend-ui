import {MenuNode} from './menu-node';

/**
 * This is a selectable entity which invokes a callback instead
 * of transitioning to a route.  An image or icon can be added
 * as usual.
 */
export class CallbackMenuNode extends MenuNode {
  constructor(public name: string, public callback: () => void, public icon: string, public img: string) {
    super();
  }
}
