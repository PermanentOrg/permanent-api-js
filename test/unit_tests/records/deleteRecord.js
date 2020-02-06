
var
util = require('util'),
fs = require('fs'),
path = require('path'),
assert = require('chai').assert,
addContext = require('mochawesome/addContext'),
mime = require('mime-types'),
common = require('../../common'),
config = require('../../config.json'),
permanent = require('../../../index')(config.apikey)
;



describe('permanent.deleteRecord()', function () {

  before(function () {
    // runs before all tests in this block
    return assert.isTrue(permanent.Init);
  });

  it.skip('should delete a record for an arhchive number', function (done) {
    // addContext(this,'some context');
    permanent.getRecord({ archive_number: '0001-000a' }).then(function (res) {
      assert.isTrue(res.success);
      done();
    });
  });

  it.skip('should return false when no archive number', function (done) {
    // addContext(this,'some context');
    permanent.getRecord({ archive_number: '' }).then(function (res) {
      assert.isFalse(res.success);
      done();
    });
  });
});


