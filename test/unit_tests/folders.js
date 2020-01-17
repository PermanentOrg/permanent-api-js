
var
assert = require('chai').assert,
addContext = require('mochawesome/addContext'),
permanent = require('../../index')('87f6e0344de0a8aea82fff2aa037')
;


describe('Folder', function () {

before(function() {
  // runs before all tests in this block
  return assert.isTrue(permanent.Init);
});


it('permanent.getFolder()', function () {
  // addContext(this, 'simple string');
  return assert.fail('not done');
});

it('permanent.addFolder()', function () {
  // addContext(this, 'simple string');
  return assert.fail('not done');
});


});
