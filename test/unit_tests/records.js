
var
  util = require('util'),
  fs = require('fs'),
  path = require('path'),
  assert = require('chai').assert,
  addContext = require('mochawesome/addContext'),
  mime = require('mime-types'),
  common = require('../common'),
  config = require('../config.json'),
  permanent = require('../../index')(config.apikey)
  ;


describe('Records', function () {

  before(function () {
    // runs before all tests in this block
    return assert.isTrue(permanent.Init);
  });

  it.skip('permanent.addRecord() should upload a file', function (done) {
    // addContext(this,'some context');
    var owner_permanent_archive_number = config.test_record_archnumber;
    var filepath = path.join(__dirname, '../assets/permanentlogo.png');
    var thefileInfo = { filename: 'permanent-logo.png', path: filepath, mimetype: mime.lookup('.png') };
    var record = {
      file: new permanent.File(thefileInfo),
      archive_number: owner_permanent_archive_number,
      originalname: 'permanent-logo.png',
      filehandle: 'permanent-logo'
    };

    permanent.addRecord(record).then(function (res) {
      assert.isTrue(res.success);
      assert.isEmpty(res.error);
      assert.isEmpty(res.message);
      assert.isObject(res.data);
      assert.isObject(res.data.record);
      assert.isNotEmpty(res.data.record.recordArchiveNumber);

      done();
    });
  });

  describe('permanent.getRecord()', function () {

    it('should return a record for an arhchive number', function (done) {
      // addContext(this,'some context');
      permanent.getRecord({ archive_number: '0001-000a' }).then(function (res) {
        assert.isTrue(res.success);
        done();
      });
    });

    it('should return false when no archive number', function (done) {
      // addContext(this,'some context');
      permanent.getRecord({ archive_number: '' }).then(function (res) {
        assert.isFalse(res.success);
        done();
      });
    });
  });


});
