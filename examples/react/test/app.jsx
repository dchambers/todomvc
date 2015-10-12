'use strict';

var expect = require('chai').expect;
var React = require('react');
var ReactTestUtils = require('react-addons-test-utils');
var TodoApp = require('../js/TodoApp.jsx');
var TodoHeader = require('../js/TodoHeader.jsx');
var TodoModel = require('../js/TodoModel.js');

// TODO: this should be moved to an external library
function component(comp) {
  var renderer = ReactTestUtils.createRenderer();
  renderer.render(comp);
  return renderer.getRenderOutput();
}

describe('TodoMVC App', function() {
  it('only renders a header when there are no items in the list', function() {
    var todoMvcApp = component(<TodoApp model={new TodoModel()}/>);
    expect(todoMvcApp.type).to.equal('div');
    expect(todoMvcApp.props.children[0].type.displayName).to.equal('TodoHeader');

    // TODO: allow test to be written like this:
    // expect(todoMvcApp).to.be.equivalent.to(<TodoHeader/>);
  });
});
