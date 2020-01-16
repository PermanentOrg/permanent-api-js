
var
assert = require('chai').assert,
addContext = require('mochawesome/addContext'),
permanent=null
;


describe('The Permanent-api-js interface ', function () {

before(function() {
  // runs before all tests in this block
  permanent = require('../../index')('87f6e0344de0a8aea82fff2aa037');
  return assert.isTrue(permanent.Init);
});

it('is initialized', function () {
  addContext(this, 'test if the api is initialized properly');
  return assert.isTrue(permanent.Init);
});


});
