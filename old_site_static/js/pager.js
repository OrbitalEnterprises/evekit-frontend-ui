/* Pager utility class*/
try {
  evekit;
} catch(e) {
  if (e instanceof ReferenceError)
    evekit = {};
}

/**
 * Construct a new Pager.
 * 
 * @constructor
 * @returns {evekit.Pager}
 */
evekit.Pager = function() {
  this.continuation_ = [ '-1' ];
  this.next_ = null;
};

/**
 * Reset this pager.
 */
evekit.Pager.prototype.reset = function() {
  this.continuation_ = [ '-1' ].slice(0);
  this.next_ = null;
};

/**
 * Continuation stack for this Pager.
 * 
 * @private
 * @type {Array.<string>}
 */
evekit.Pager.prototype.continuation_ = null;

/**
 * Continuation value for next page of results, or null if there is no next
 * page.
 * 
 * @private
 * @type {string}
 */
evekit.Pager.prototype.next_ = null;

/**
 * Return the continuation for the current page. You can use this value to
 * re-display the current page.
 * 
 * @returns {string}
 */
evekit.Pager.prototype.current = function() {
  return this.continuation_[this.continuation_.length - 1];
};

/**
 * Return the continuation for the previous page of results, or null if there is
 * no previous page.
 * 
 * @returns {string}
 */
evekit.Pager.prototype.prev = function() {
  if (this.continuation_.length > 1) {
    return this.continuation_[this.continuation_.length - 2];
  }
  return null;
};

/**
 * Return the continuation for the next page of results, or null if there is no
 * next page.
 * 
 * @returns {string}
 */
evekit.Pager.prototype.next = function() {
  return this.next_;
};

/**
 * Make the previous continuation the current continuation if it's not null.
 */
evekit.Pager.prototype.goprev = function() {
  if (this.prev() != null) {
    this.continuation_.pop();
  }
};

/**
 * Make the next continuation the current continuation if it's not null.
 */
evekit.Pager.prototype.gonext = function() {
  if (this.next_ != null) {
    this.continuation_.push(this.next_);
    this.next_ = null;
  }
};

/**
 * Set the next continuation value if opt_save is true. Otherwise, set the next
 * value to null.
 * 
 * @param {string}
 *          el the new continuation to save.
 * @param {boolean}
 *          opt_save optional parameter controlling whether to really set "el"
 *          as the next value. if true, then save "el" as the next continuation,
 *          otherwise the next continuation is set to null.
 */
evekit.Pager.prototype.setnext = function(el, opt_save) {
  this.next_ = (angular.isDefined(opt_save) ? opt_save : true) ? el : null;
};
