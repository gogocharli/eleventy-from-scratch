const sortByDisplayOrder = require('./src/utils/sort-by-display-order');

module.exports = (config) => {
  // Returns work items, sorted by display order
  config.addCollection('work', (collection) => {
    return sortByDisplayOrder(collection.getFilteredByGlob('./src/work/*.md'));
  });

  // Returns work items, sorted by display order then filtered by featured
  config.addCollection('featuredWork', (collection) => {
    return sortByDisplayOrder(
      collection.getFilteredByGlob('./src/work/*.md')
    ).filter((x) => x.data.featured);
  });

  config.addPassthroughCopy('./src/images/');
  return {
    // Specify templating engines
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',

    // Specify directories for eleventy
    dir: {
      input: 'src',
      output: 'dist',
    },
  };
};
