/**
 * Restrictions against when the node should be visible.
 */
export enum MenuGuard {
  LOGGED_IN,
  ADMIN,
  COMING_SOON,
  EXTERNAL
}

/**
 * Base class of menu items.
 */
export class MenuNode {
  children: MenuNode[] = [];
  guards: MenuGuard[] = [];
  dynamicChildren: MenuNode[] = [];

  constructor() {}

  addChild(child: MenuNode): MenuNode {
    this.children.push(child);
    return this;
  }

  addGuard(guard: MenuGuard): MenuNode {
    this.guards.push(guard);
    return this;
  }
}
