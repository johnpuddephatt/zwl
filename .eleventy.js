const path = require('path');
// const pluginSrcsetImg = require( "eleventy-plugin-srcset" );
const svgContents = require("eleventy-plugin-svg-contents");



module.exports = function(eleventyConfig) {


  // Shortcodes
  eleventyConfig.addShortcode('excerpt', article => extractExcerpt(article));

  // Plugins
  // eleventyConfig.addPlugin( pluginSrcsetImg );
  eleventyConfig.addPlugin(svgContents);

  // Copy files
  eleventyConfig.addPassthroughCopy('./src/admin');
  eleventyConfig.addPassthroughCopy('./src/assets');
  eleventyConfig.addPassthroughCopy('./src/uploads');
  eleventyConfig.addPassthroughCopy({ "./src/_favicons/**/*": "./" });

  // Collections
  eleventyConfig.addCollection('posts', collection => {
    return collection.getFilteredByGlob('./src/posts/*.md');
  });

  // Categories
  eleventyConfig.addCollection('tags', collection => {
    return collection.getFilteredByGlob('./src/tags/*.md').sort(function(a, b) {
      return Number(b.data.order || 0) - Number(a.data.order || 0);
    });
  });

  eleventyConfig.addCollection('tips', collection => {
    return collection.getFilteredByGlob('./src/tips/*.md');
  });

  eleventyConfig.addCollection('pipeline', collection => {
    return collection.getFilteredByGlob('./src/pipeline/*.md');
  });

  eleventyConfig.addCollection('pages', collection => {
    return collection.getFilteredByGlob('./src/pages/*.md');
  });

  eleventyConfig.addLayoutAlias('supporters', 'partials/supporters.html');


  eleventyConfig.addFilter('where', function (array, key, value) {
    return array.filter(item => {
      const keys = key.split('.');
      const reducedKey = keys.reduce((object, key) => {
        return object[key];
      }, item);

      return (reducedKey === value ? item : false);
    });

  });

  eleventyConfig.addFilter('whereContains', function (array, key, value) {
    return array.filter(item => {
      const keys = key.split('.');
      const reducedKey = keys.reduce((object, key) => {
        return object[key];
      }, item);

      return (reducedKey.indexOf(value) == -1 ? false : item);
    });
  });

  eleventyConfig.addNunjucksFilter("limit", function(arr, limit) {
    return arr.slice(0, limit);
  });

  eleventyConfig.addNunjucksFilter("slice", function(arr, start, end) {
    return arr.slice(start, end);
  });


  eleventyConfig.setLiquidOptions({
    dynamicPartials: false,
    root: [
      '_includes',
      '.'
    ]
  });

  const md = require('markdown-it')({
      html: false,
      breaks: true,
      linkify: true
  });

  eleventyConfig.addNunjucksFilter("markdownify", markdownString => md.render(markdownString));


  eleventyConfig.srcsetWidths = [ 320, 640, 960, 1280, 1600, 1920, 2240, 2560 ];
  
  eleventyConfig.addShortcode('srcset', (path, alt, className, width, height, sizes, resize) => {
    const src = `${path}?nf_resize=${resize||'smartcrop'}&w=${ width }&h=${ height }`;
    const srcset = eleventyConfig.srcsetWidths.map(w => {
      return `${path}?nf_resize=${resize||'smartcrop'}&w=${ w }&h=${ (width && height) ? Math.floor(height/width * w) : '' }`;
    }).join(', ');
    return `<img src="${src}" class="${className}" srcset="${srcset}" sizes="${sizes ? sizes : '100vw'}" alt="${alt ? alt : ''}">`;
  });

  return {
    dir: {
      input: "./src",      // Equivalent to Jekyll's source property
      output: "./dist", // Equivalent to Jekyll's destination property
      data: `./_data/`,
      includes: `./_includes/`,
    },
    // passthroughFileCopy: true,
    templateFormats: [
      "njk",
      "md",
      "html"
    ]
  };
};

function extractExcerpt(article) {
  let excerpt = null;

  const content = article.templateContent || 'foo';

  // The start and end separators to try and match to extract the excerpt
  const startPosition = content.indexOf('<p>');
  const endPosition = content.indexOf('</p>');
  const excerptLength = 100;

  if (startPosition !== -1 && endPosition !== -1) {
    excerpt = content.substring(startPosition, endPosition).replace(/(<([^>]+)>)/ig,"").trim().substring(0,excerptLength) + '...';
  }
  else {
    excerpt = '';
  }

  return excerpt;
}
