
var
  util = require('util'),
  assert = require('chai').assert,
  addContext = require('mochawesome/addContext'),
  moment = require('moment'),
  common = require('../../common'),
  config = require('../../config.json'),
  permanent = require('../../../index')(config.apikey)
  ;


  describe('/folder/add', function () {

    it('should add a folder', function (done) {
      var req = {
        data: {
          archive: {
            paNumber: config.test_archive_paNumber,
          },
          folder: {
            name: 'new folder - ' + moment().format('MM-DD-YYYY:hh:mm:ss'),
            parentFolder_paNumber:''
          }
        }
      };
  
      permanent.folder.add(req).then(function (response) {
        var res = response.data;
        assert.isTrue(response.statusCode == 200);
        assert.isTrue(res.success);
        assert.isString(res.data.folder.paNumber, 'folder panumber is: ' + res.data.folder.paNumber);
        assert.isEmpty(res.error);
        assert.isEmpty(res.message);
        assert.isTrue(res.httpcode == '200');
  
        done();
      });
  
    });
  
    
    it('should not add a folder with bad archive number', function (done) {
      var req = {
        data: {
          archive: {
            paNumber:'0001-00',
          },
          folder: {
            name: 'new folder - ' + moment().format('MM-DD-YYYY:hh:mm:ss')
          }
        }
      };
  
      permanent.folder.add(req).then(function (response) {
        var res = response.data;
        assert.isTrue(res.httpcode == 401);
        assert.isFalse(res.success);
        assert.isTrue(res.error == 'access_denied');
        done();
      });
  
    });
  
  
  
  });
  