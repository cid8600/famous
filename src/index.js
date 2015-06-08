
var FamousEngine = require('famous/core/FamousEngine');

FamousEngine.init();

// APP Code
var Carousel = require('./carousel/Carousel');
var imageData = require('./data/data');
var carousel = new Carousel('body', {pageData: imageData});