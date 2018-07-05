/**
 * Flattened representation of a MenuNode for tree rendering.
 */
export class FlatMenuNode {
  constructor(public level: number, public expandable: boolean) {
  }
}
