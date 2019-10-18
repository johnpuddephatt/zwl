"use strict";

const sharp = require('sharp');
const rimraf = require('rimraf');
const path = require('path');
const fs = require('fs-extra');
const { JSDOM } = require('jsdom');

const respImagesConfig = {
  selector: '.page-body img',
  srcsetWidths: [ 320, 640, 960, 1280, 1600 ],
  fallbackWidth: 640,
  convertTitlesToCaptions: true,
  fallbackHeight: 360,
  dirs: {
    input: "./src/",
    output: "./dist/"
  }
}

const updateImage = async imgElem => {
  let imageName = imgElem.src;
  let imageExtension = imageName.split('.').pop();
  let imageFilename = imageName.split('.').shift();
  let height = respImagesConfig.fallbackHeight || null;
  let width = respImagesConfig.fallbackWidth;

 // update markup
  let srcset = `${
    respImagesConfig.srcsetWidths.map( ( w ) => {
      return `${ imageFilename }_${ w }w${height ? (height/width * w) + 'h' : ''}.${ imageExtension } ${ w }w`
    } ).join( ', ' )
    }`;
  imgElem.setAttribute('srcset', srcset);

  // @todo create captions if setting is true
  if(respImagesConfig.convertTitlesToCaptions && imgElem.getAttribute('title')) {
    imgElem.insertAdjacentHTML('afterend', `<figure><img src="${imgElem.src}" srcset="${srcset}"/><figcaption>${imgElem.title}</figcaption></figure>`);
    imgElem.remove();
  }

  // generate image files
  resizeImage(imageName, width, height);
}

// Function to resize a single image
const resizeImage = function(image, width, height) {
  let imageExtension = image.split('.').pop();
  let imageFilename = image.split('.').shift();

  fs.ensureDirSync(path.join(process.cwd(), respImagesConfig.dirs.output, 'uploads'));

  let srcPath = path.join(process.cwd(), respImagesConfig.dirs.input, image);

  respImagesConfig.srcsetWidths.forEach((size, counter) => {
      let outputPath = path.join(process.cwd(), respImagesConfig.dirs.output, imageFilename + '_' +  size + 'w' + (height ? Math.floor(height/width * size) + 'h' : '') + '.' + imageExtension);
      if (!fs.existsSync(outputPath)) {
        sharp(srcPath).resize(size,(height? Math.floor(height/width * size) : null)).toFile(outputPath)
        .catch( err => { console.log(err) });
      }
  });

  let outputPath = path.join(process.cwd(), respImagesConfig.dirs.output, imageFilename + '_' +  width + 'w' + (height? height + 'h' : '') + '.' + imageExtension);
  if (!fs.existsSync(outputPath)) {
    sharp(srcPath).resize(width,(height? height : null)).toFile(outputPath)
    .catch( err => { console.log(err) });
  }
}

module.exports = {
  auto: async function(content, outputPath) {
    if( outputPath.endsWith(".html") ) {
      const dom = new JSDOM(content);
      const images = [...dom.window.document.querySelectorAll(respImagesConfig.selector)];
      if(images.length > 0) {
        await Promise.all(images.map(updateImage));
      }
      content = dom.serialize();
    }
    return content;
  },

  shortcode: function( image, alt, className, width, height, sizes ) {
    resizeImage(image, width, height);
    let imageExtension = image.split('.').pop();
    let imageFilename = image.split('.').shift();
    return `<img
      srcset="${
      respImagesConfig.srcsetWidths.map( ( w ) => {
        return `${ imageFilename }_${ w }w${height ? Math.floor(height/width * w) + 'h' : ''}.${ imageExtension } ${ w }w`
      } ).join( ', ' )
      }"
      sizes="${ sizes ? sizes : '100vw' }"
      class="${ className }"
      src="${ imageFilename }_${ width ? width : respImagesConfig.fallbackWidth }w${height ? height + 'h' : ''}.${ imageExtension }"
      alt="${ alt ? alt : '' }"
      >`;
  }
}