
var
  util = require('util'),
  assert = require('chai').assert,
  addContext = require('mochawesome/addContext'),
  moment = require('moment'),
  common = require('../../common'),
  config = require('../../config.json'),
  permanent = require('../../../index')(config.apikey)
  ;




describe('/archive/add', function () {

  it('should create a person archive', function (done) {
    var req = {
      data: {
        fullname: "test-" + moment().format('MM-DD-YYYY:hh:mm:ss'),
        type: 'person'
      }
    };

    permanent.archive.add(req).then(function (response) {
      var res = response.data;
      assert.isTrue(response.statusCode == 200);
      assert.isTrue(res.success);
      assert.isString(res.data.paNumber, 'new archive number is: ' + res.data.paNumber);
      assert.isEmpty(res.error);
      assert.isEmpty(res.message);
      assert.isTrue(res.httpcode == '200');
      done();
    });

  });

  it('should return false when no name given', function (done) {
    var req = {
      data: {
        fullname: '',
        type: 'person'
      }
    };

    permanent.archive.add(req).then(function (response) {
      var res = response.data;
      assert.isTrue(response.statusCode == 400);
      assert.isFalse(res.success);
      assert.isNotEmpty(res.error);
      assert.isTrue(res.httpcode == '400');
      done();
    });

  });

  //not supported yet
  it.skip('should create a family archive', function (done) {
    // this.timeout(500);

    var req = {
      apiKey: config.apikey,
      data: {
        fullname: "family-" + moment().format('MM-DD-YYYY:hh:mm:ss'),
        type: 'family'
      }
    };

    reqHlp.testPostForm('/archive/add', req).then(function (response) {
      var res = response.data;
      assert.isTrue(response.statusCode == 200);
      assert.isTrue(res.success);
      assert.isEmpty(res.error);
      assert.isEmpty(res.message);
      assert.isTrue(res.httpcode == '200');
      assert.isString(res.data.paNumber, 'new archive number is: ' + res.data.paNumber);
      done();
    });

  });

  //not supported yet
  it.skip('should create a organization archive', function (done) {
    var req = {
      apiKey: config.apikey,
      data: {
        fullname: "organization-" + moment().format('MM-DD-YYYY:hh:mm:ss'),
        type: 'organization'
      }
    };

    reqHlp.testPostForm('/archive/add', req).then(function (response) {
      var res = response.data;
      assert.isTrue(response.statusCode == 200);
      assert.isTrue(res.success);
      assert.isEmpty(res.error);
      assert.isEmpty(res.message);
      assert.isTrue(res.httpcode == '200');
      assert.isString(res.data.paNumber, 'new archive number is: ' + res.data.paNumber);
      done();
    });

  });



});
