
var
util = require('util'),
fs = require('fs'),
path = require('path'),
assert = require('chai').assert,
addContext = require('mochawesome/addContext'),
mime = require('mime-types'),
common = require('../../common'),
config = require('../../config.json'),
permanent = require('../../../index')(config.apikey),
moment=require('moment')
;




describe('/record/update', function () {
  
  it('should update a record', function (done) {

    //first create a record
    var filepath = path.join(__dirname, '../../assets/permanentlogo.png');
    var req = {
      apiKey: config.apikey,
      data: {
        archive: {
          paNumber: config.test_archive_paNumber
        },
        record: {
          name: 'record to update - ' + moment().format('MM-DD-YYYY:hh:mm:ss')
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
      assert.isString(res.data.record.paNumber, 'new archive number is: ' + res.data.record.paNumber);

      var req2 = {
        apiKey: config.apikey,
        data: {
          paNumber: res.data.record.paNumber,
          recordName: 'update name - '+moment().format('MM-DD-YYYY:hh:mm:ss'),
          description:'updated description '+moment().format('MM-DD-YYYY:hh:mm:ss')
        }
      };
     
      permanent.record.update(req2).then(function (response) {
          var res = response.data;
          assert.isTrue(response.statusCode == 200);
          assert.isTrue(res.success);
          assert.isEmpty(res.error);
          assert.isEmpty(res.message);
          assert.isTrue(res.httpcode == '200');
          done();
        });
     
    });

  });

  it('should return false when no archive number', function (done) {
    var req = {
      apiKey: config.apikey, 
      data: {
        paNumber: '',
        recordName: 'update name - '+moment().format('MM-DD-YYYY:hh:mm:ss'),
        description:'updated description '+moment().format('MM-DD-YYYY:hh:mm:ss'),
      }
    };
    

    permanent.record.update(req).then(function (response) {
      var res = response.data;
      assert.isTrue(response.statusCode == 400);
      assert.isTrue(res.error=='missing_paNumber');
      assert.isObject(res.data);
      done();
    });
  });
});

