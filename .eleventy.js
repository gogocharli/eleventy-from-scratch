// Plugins
const rssPlugin = require('@11ty/eleventy-plugin-rss');

// Filters
const dateFilter = require('./src/filters/date-filter');
const w3DateFilter = require('./src/filters/w3-date-filter');

// Utilities
const sortByDisplayOrder = require('./src/utils/sort-by-display-order');

module.exports = (config) => {
  // Plugins
  config.addPlugin(rssPlugin);

  // Add filters
  config.addFilter('dateFilter', dateFilter);
  config.addFilter('w3DateFilter', w3DateFilter);

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

  // Returns a collection of blog posts in reverse chronological order
  config.addCollection('blog', (collection) => {
    return [...collection.getFilteredByGlob('./src/posts/*.md')].reverse();
  });

  // Returns a collection of people working at the agency
  config.addCollection('people', (collection) => {
    return [...collection.getFilteredByGlob('./src/people/*.md')].sort(
      (a, b) => {
        return +a.fileSlug - +b.fileSlug;
      }
    );
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
