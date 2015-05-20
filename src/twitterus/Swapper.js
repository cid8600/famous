var data = require('./Data');
var Section = require('./Section');
var Node = require('famous/core/Node');
var Align = require('famous/components/Align');
var DOMElement = require('famous/dom-renderables/DOMElement');

// The swapper will hold the sections and swap between them
// on events
function Swapper () {
    // subclass Node
    Node.call(this);

    // create a new dom element 
    this.el = new DOMElement(this);

    // store the current section
    this.currentSection = null;

    // create the sections
    this.sections = createSections.call(this);
}

// subclass Node
Swapper.prototype = Object.create(Node.prototype);

function createSections () {
    var result = {};

    // iterate over all the sections in our data
    data.sections.forEach(function (section, i) {
        var child = this.addChild();
        result[section.id] = {
            align: new Align(child),
            section: child.addChild(new Section(i))
        }
    }.bind(this));

    return result;
}

module.exports = Swapper;