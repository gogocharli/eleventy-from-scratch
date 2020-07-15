module.exports = {
  /**
   * Returns back some attributes based on whether the
   * link is active or a parent of an active item
   *
   * @param {String} itemUrl The link in question
   * @param {String} pageUrl The page context
   * @returns {String} The attributes or empty
   */
  getLinkActiveState(itemUrl, pageUrl) {
    let response = '';

    if (itemUrl === pageUrl) {
      response = ' aria-current="page"';
    }

    // For example we have /about-us/section
    if (itemUrl.length > 1 && pageUrl.indexOf(itemUrl) === 0) {
      // Will be used in CSS to decorate that section
      response += ' data-state="active"';
    }

    return response;
  },
};
