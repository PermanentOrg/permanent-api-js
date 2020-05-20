
var
  util = require('util'),
  assert = require('chai').assert,
  addContext = require('mochawesome/addContext'),
  moment = require('moment'),
  common = require('../../common'),
  config = require('../../config.json'),
  permanent = require('../../../index')(config.apikey)
  ;

  
describe('/archive/get', function () {

  it('should fetch an archive given an archive number', function (done) {
    var req = {
      data: {
        paNumber: '0001-0000'  
      }
    };

    permanent.archive.get(req).then(function (response) {
      var res = response.data;
      assert.isTrue(response.statusCode == 200);
      assert.isTrue(res.httpcode == '200');

      assert.isTrue(res.success);
      assert.isEmpty(res.error);
      assert.isEmpty(res.message);

      assert.isObject(res.data.archive);
      assert.isNotEmpty(res.data.archive.paNumber);
      assert.isNotEmpty(res.data.archive.thumbnails.thumbURL1000);
      assert.isNotEmpty(res.data.archive.thumbnails.thumbURL2000);
      assert.isNotEmpty(res.data.archive.thumbnails.thumbURL200);
      assert.isNotEmpty(res.data.archive.thumbnails.thumbURL500);
      assert.isNotEmpty(res.data.archive.folders);
      assert.isNotEmpty(res.data.archive.profile);
      assert.isNotEmpty(res.data.archive.profile.fullname);


      done();
    });


  });

  it('should return false when no archive number', function (done) {
    var req = {
      data: {
        paNumber: ''  
      }
    };

    permanent.archive.get(req).then(function (response) {
      var res = response.data;
      assert.isTrue(response.statusCode == 400);
      assert.isTrue(res.httpcode == '400');
      assert.isFalse(res.success);
      assert.isTrue(res.error=='no_pa_number');

      done();
    });


  });

});

