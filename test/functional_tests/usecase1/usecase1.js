
var
assert = require('chai').assert,
addContext = require('mochawesome/addContext'),
permanent=null,
config = require('../../config.json')
;


describe('Use Case 1', function () {

before(function() {
  // runs before all tests in this block
  permanent = require('../../../index')(config.apikey);
  return assert.isTrue(permanent.Init);
});

it('is initialized', function () {
  addContext(this, 'simple string');
  return assert.isTrue(permanent.Init);
});


});
