
var
  util = require('util'),
  fs = require('fs'),
  path = require('path'),
  assert = require('chai').assert,
  addContext = require('mochawesome/addContext'),
  mime = require('mime-types'),
  common = require('../../common'),
  config = require('../../config.json'),
  moment=require('moment'),
  permanent = require('../../../index')(config.apikey)
  ;


describe('/record/delete', function () {
  // config.apikey

  it('should delete a record', function (done) {

    //first create a record
    var filepath = path.join(__dirname, '../../assets/permanentlogo.png');
    var req = {
      data: {
        archive: {
          paNumber: config.test_archive_paNumber
        },
        record: {
          name: 'file should delete - ' + moment().format('MM-DD-YYYY:hh:mm:ss')
        }
      },
      file: {
        name: "permanentlogo.png",
        filepath: filepath,
        contentType: mime.lookup('.png')
      },
    };


    permanent.record.add(req).then(function (res) {
      assert.isTrue(res.success);
      assert.isEmpty(res.error);
      assert.isEmpty(res.message);
      assert.isTrue(res.httpcode == 200);
      assert.isObject(res.data);
      assert.isObject(res.data.record);
      assert.isNotEmpty(res.data.record.paNumber);
      assert.isString(res.data.record.paNumber, 'new archive number is: ' + res.data.record.paNumber);

      var req2 = {
        data: {
          paNumber: res.data.record.paNumber
        }
      };

      setTimeout(function () {
        permanent.record.delete(req2).then(function (response) {
          var res = response.data;
          assert.isTrue(response.statusCode == 200);
          assert.isTrue(res.success);
          assert.isEmpty(res.error);
          assert.isEmpty(res.message);
          assert.isTrue(res.httpcode == '200');
          done();
        });
      }, 5000);

    });

  });

  it('should return false when no archive number', function (done) {
    var req = {
      data: {
        paNumber: ''
      }
    };

    permanent.record.delete(req).then(function (response) {
      var res = response.data;
      assert.isTrue(response.statusCode == 400);
      assert.isFalse(res.success);
      assert.isTrue(res.error=='missing_paNumber');
      done();
    });
  });
});


