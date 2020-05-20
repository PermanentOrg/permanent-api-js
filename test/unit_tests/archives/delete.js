
var
  util = require('util'),
  assert = require('chai').assert,
  addContext = require('mochawesome/addContext'),
  moment = require('moment'),
  common = require('../../common'),
  config = require('../../config.json'),
  permanent = require('../../../index')(config.apikey)
  ;


  describe('/archive/delete', function () {

    it('should delete an archive', function (done) {
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
        assert.isString(res.data.paNumber);
        assert.isEmpty(res.error);
        assert.isEmpty(res.message);
        assert.isTrue(res.httpcode == '200');
  
        var req2 = {
          apiKey: config.apikey,
          data: {
            paNumber: res.data.paNumber
          }
        };
        
        //ALLOW SERVER TO CREATE ARCHIVE AND SET THINGS UP THEN CALL DELETE
        setTimeout(function () {
          permanent.archive.delete(req2).then(function (dres) {
            var res = dres.data;
            assert.isTrue(dres.statusCode == 200);
            assert.isTrue(res.success);
            assert.isEmpty(res.error);
            assert.isEmpty(res.message);
            assert.isTrue(res.httpcode == '200');
            done();
          });
  
        },3000);
  
  
      });
  
    });
  
    it('should not delete an archive if not owned by account', function (done) {
      var req2 = {
        data: {
          paNumber: '000d-0000'
        }
      };
  
      permanent.archive.delete(req2).then(function (dres) {
        var res = dres.data;
        assert.isTrue(dres.statusCode == 401);
        assert.isFalse(res.success);
        assert.isTrue(res.error=='access_denied');
        assert.isTrue(res.httpcode == '401');
        done();
      });
    });
  
    it('should return false when no archive number', function (done) {
      var req2 = {
        data: {
          paNumber: ''
        }
      };
  
      permanent.archive.delete(req2).then(function (response) {
        var res = response.data;
        assert.isTrue(response.statusCode == 400);
        assert.isTrue(res.httpcode == '400');
        assert.isFalse(res.success);
        assert.isTrue(res.error=='no_pa_number');
        
        done();
      });
    });
  
  
  
  });
  