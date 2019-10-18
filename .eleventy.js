const path = require('path');
const markdownIt = require("markdown-it");
const markdownItResponsive = require('@gerhobbelt/markdown-it-responsive');
const svgContents = require("eleventy-plugin-svg-contents");

const respImg = require(path.join(process.cwd(), "lib/extensions/respimg"));
const respImgShortcode = respImg.shortcode;
const respImgAuto = respImg.auto;



module.exports = function(eleventyConfig) {


  // Shortcodes
  eleventyConfig.addShortcode( 'respimg', ( image, alt, className, width, height, sizes ) => respImgShortcode( image, alt, className, width, height, sizes ) );
  eleventyConfig.addShortcode('excerpt', article => extractExcerpt(article));

  // Plugins
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

  eleventyConfig.addCollection('tips', collection => {
    return collection.getFilteredByGlob('./src/tips/*.md');
  });

  eleventyConfig.addCollection('pipeline', collection => {
    return collection.getFilteredByGlob('./src/pipeline/*.md');
  });

  eleventyConfig.addCollection('discussions', collection => {
    return collection.getFilteredByGlob('./src/discussions/*.md');
  });

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


  eleventyConfig.addTransform("respImgAuto", respImgAuto);


  eleventyConfig.setLiquidOptions({
    dynamicPartials: false,
    root: [
      '_includes',
      '.'
    ]
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
  const excerptLength = 120;

  if (startPosition !== -1 && endPosition !== -1) {
    excerpt = content.substring(startPosition + 3, endPosition).trim().substring(0,excerptLength) + '...';
  }
  else {
    excerpt = '';
  }

  return excerpt;
}