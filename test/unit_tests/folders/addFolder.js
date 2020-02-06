
var
  util = require('util'),
  assert = require('chai').assert,
  addContext = require('mochawesome/addContext'),
  moment = require('moment'),
  common = require('../../common'),
  config = require('../../config.json'),
  permanent = require('../../../index')(config.apikey)
  ;


describe('permanent.addFolder()', function () {

  before(function () {
    // runs before all tests in this block
    return assert.isTrue(permanent.Init);
  });

  it('should add a folder given a name');

  it('should return false when not given a name');



});
