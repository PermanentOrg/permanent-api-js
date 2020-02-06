
var
  util = require('util'),
  assert = require('chai').assert,
  addContext = require('mochawesome/addContext'),
  moment = require('moment'),
  common = require('../../common'),
  config = require('../../config.json'),
  permanent = require('../../../index')(config.apikey)
  ;


describe('permanent.deleteFolder()', function () {

  before(function () {
    // runs before all tests in this block
    return assert.isTrue(permanent.Init);
  });


  it('should delete a folder given an archive number');
  it('should return false if no archive number');


});
