
var
  util = require('util'),
  fs = require('fs'),
  path = require('path'),
  assert = require('chai').assert,
  addContext = require('mochawesome/addContext'),
  mime = require('mime-types'),
  common = require('../../common'),
  config = require('../../config.json'),
  moment = require('moment'),
  permanent = require('../../../index')(config.apikey)
  ;



describe('/record/get', function () {

  it('should get a record', function (done) {
    //first create a record
    var filepath = path.join(__dirname, '../../assets/permanentlogo.png');
    var req = {
      data: {
        archive: {
          paNumber: config.test_archive_paNumber
        },
        record: {
          name: 'permanent-logo - ' + moment().format('MM-DD-YYYY:hh:mm:ss')
        }
      },
      file: {
        name: "permanent-logo.png",
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
      assert.isString(res.data.record.paNumber, 'new rec panumber is: ' + res.data.record.paNumber);

      var req2 = {
        data: {
          paNumber: res.data.record.paNumber
        }
      };

      setTimeout(function () {

        permanent.record.get(req2).then(function (response) {
          var res = response.data;
          assert.isTrue(response.statusCode == 200);
          assert.isTrue(res.success);
          assert.isEmpty(res.error);
          assert.isEmpty(res.message);
          assert.isTrue(res.httpcode == '200');

          assert.isObject(res.data.record);
          assert.isObject(res.data.record.thumbnails);
          assert.isNotEmpty(res.data.record.thumbnails.thumbURL200);
          assert.isNotEmpty(res.data.record.thumbnails.thumbURL500);
          assert.isNotEmpty(res.data.record.thumbnails.thumbURL1000);
          assert.isNotEmpty(res.data.record.thumbnails.thumbURL2000);

          assert.isNotEmpty(res.data.record.status);
          assert.isNotEmpty(res.data.record.type);
          assert.isNumber(res.data.record.size);
          assert.isNotEmpty(res.data.record.contentType);
          assert.isNumber(res.data.record.height);
          assert.isNumber(res.data.record.width);
          assert.isNotEmpty(res.data.record.downloadURL);
          

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

    permanent.record.get(req).then(function (response) {
      var res = response.data;
      assert.isTrue(response.statusCode == 400);
      assert.isFalse(res.success);
      assert.isTrue(res.error == 'missing_paNumber');
      assert.isEmpty(res.message);
      assert.isTrue(res.httpcode == '400');
      done();
    });
  });

  it.skip('should not get a deleted record', function (done) {
    var req = {
      apiKey: config.apikey,
      data: {
        paNumber: '0001-0006'
      }
    };

    permanent.record.get(req).then(function (response) {
      var res = response.data;
      assert.isTrue(response.statusCode == 200);
      assert.isTrue(res.success);
      assert.isTrue(res.data.record.status == 'not_found');
      assert.isEmpty(res.error);
      assert.isEmpty(res.message);
      assert.isTrue(res.httpcode == '200');
      done();
    });
  });

  it('should not return a record if no access', function (done) {
    var req = {
      apiKey: config.apikey,
      data: {
        paNumber: '000a-0001'
      }
    };

    permanent.record.get(req).then(function (response) {
      var res = response.data;
      assert.isTrue(response.statusCode == 404);
      assert.isFalse(res.success);
      assert.isTrue(res.data.record.status == 'not_found');
      assert.isEmpty(res.error);
      assert.isEmpty(res.message);
      assert.isTrue(res.httpcode == '404');
      done();
    });
  });

});




// describe('permanent.getRecord()', function () {

//   before(function () {
//     // runs before all tests in this block
//     return assert.isTrue(permanent.Init);
//   });

//   it('should return a record for an arhchive number', function (done) {
//     // addContext(this,'some context');
//     permanent.getRecord({ archive_number: '0001-000a' }).then(function (res) {
//       assert.isTrue(res.success);
//       done();
//     });
//   });

//   it('should return false when no archive number', function (done) {
//     // addContext(this,'some context');
//     permanent.getRecord({ archive_number: '' }).then(function (res) {
//       assert.isFalse(res.success);
//       done();
//     });
//   });
// });


