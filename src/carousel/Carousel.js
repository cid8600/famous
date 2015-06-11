/**
 * Carousel.js
 */

var FamousEngine = require('famous/core/FamousEngine');
var DOMElement = require('famous/dom-renderables/DOMElement');
var Arrow = require('./Arrow.js');
var Pager = require('./Pager.js');
var Dots = require('./Dots.js');


function Carousel(selector, data) {
    // Create a new Scene instance. Scenes are
    // the starting point for all Famous apps.
    this.context = FamousEngine.createScene(selector);

    // Add the first scene graph node to the
    // context. This is the 'root' node.
    this.root = this.context.addChild();

    // Keep reference to the page data, which is
    // the images we'll display in our carousel
    this.pageData = data.pageData;

    this.arrows = {
        back: new Arrow(this.root.addChild(), { direction: -1 }),
        next: new Arrow(this.root.addChild(), { direction: 1 })
    };

    this.pager = new Pager(this.root.addChild(), { pageData: this.pageData });

    this.dots = new Dots(this.root.addChild(), { numPages: this.pageData.length });

    _positionComponents.call(this);

    this.currentIndex = 0;
    _bindEvents.call(this);

    // Decorate the node with a DOMElement
    // component, and use the component to apply
    // content and styling
    // this.el = new DOMElement(this.root);
    // this.el.setContent('Hello World');
    // this.el.setProperty('font-size', '40px');
    // this.el.setProperty('color', 'white');


}

function _positionComponents() {

    this.arrows.back.node.setSizeMode('absolute', 'absolute');
    this.arrows.back.node.setAbsoluteSize(40, 40);
    this.arrows.back.node.setPosition(40, 0, 0);
    this.arrows.back.node.setAlign(0, 0.5, 0);
    this.arrows.back.node.setMountPoint(0, 0.5, 0);

    this.arrows.next.node.setSizeMode('absolute','absolute');
    this.arrows.next.node.setAbsoluteSize(40, 40);
    this.arrows.next.node.setPosition(-40, 0, 0);
    this.arrows.next.node.setAlign(1, 0.5, 0);
    this.arrows.next.node.setMountPoint(1, 0.5, 0);

    this.dots.node.setSizeMode('default', 'absolute');
    this.dots.node.setAbsoluteSize(null, 20);
    this.dots.node.setPosition(0, -50, 0);
    this.dots.node.setAlign(0.5, 1, 0);
    this.dots.node.setMountPoint(0.5, 1, 0);

    this.pager.node.setAlign(0.5, 0.5, 0);
    this.pager.node.setMountPoint(0.5, 0.5, 0);

}

function _bindEvents() {
    //listen for a 'pageChange' event and assign a callback
    this.root.addComponent({
        onReceive: function(e, payload) {
            if (e === 'pageChange') {
                var direction = payload.direction;
                var amount = payload.amount;
                amount = amount || 1;

                var oldIndex = this.currentIndex;

                var i = oldIndex + (direction * amount);
                var min = 0;
                var max = this.pageData.length - 1;

                var newIndex = i > max ? max : i < min ? min : i;

                if (this.currentIndex !== newIndex) {
                    this.currentIndex = newIndex;
                    this.dots.pageChange(oldIndex, this.currentIndex);
                    this.pager.pageChange(oldIndex, this.currentIndex);
                }
            }
        }.bind(this)
    });

    window.addEventListener('keydown', function(e) {
        if (e.keyCode === 39) this.root.emit('pageChange', {direction: 1, amount: 1});
        if (e.keyCode === 37) this.root.emit('pageChange', {direction: -1, amount: 1});
    }.bind(this));

    // for ie 10
    window.addEventListener('click', function(e) {
        if (e.srcElement.innerText === '<') this.root.emit('pageChange', {direction: -1, amount: 1});
        if (e.srcElement.innerText === '>') this.root.emit('pageChange', {direction: 1, amount: 1});
    }.bind(this));
}

module.exports = Carousel;