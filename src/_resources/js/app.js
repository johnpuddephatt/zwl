"use strict";

// const nunjucks = require('nunjucks');
// const html5Boilerplate = require('_includes/extends/html5boilerplate.njk');
// console.log(nunjucks.render('/src/_includes/extends/html5boilerplate.njk'))

require('typesplit');

new SplitType('.home-hero__title', { split: 'lines', tagName: 'span' });
new SplitType('.project__title', { split: 'lines', tagName: 'span' });