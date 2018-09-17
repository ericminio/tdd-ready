import { JSDOM } from 'jsdom';
global.window = new JSDOM('<!doctype html><html><body></body></html>', {
  url: "http://localhost",
}).window;
global.document = global.window.document;

let exposedProperties = ['window', 'navigator', 'document'];

Object.keys(global.window).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = global.window[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};
