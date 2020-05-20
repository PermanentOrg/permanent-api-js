
var
  util = require('util'),
  assert = require('chai').assert,
  addContext = require('mochawesome/addContext'),
  moment = require('moment'),
  common = require('../../common'),
  config = require('../../config.json'),
  permanent = require('../../../index')(config.apikey)
  ;

  describe('/folder/update', function () {

    it('should update a folder', function (done) {
      //add one first then update it
      var req = {
        data: {
          archive: {
            paNumber: config.test_archive_paNumber,
          },
          folder: {
            name: 'new folder - ' + moment().format('MM-DD-YYYY:hh:mm:ss'),
            description: 'the folder description'
  
          }
        }
      };
  
      permanent.folder.add(req).then(function (response) {
        var res = response.data;
        assert.isTrue(res.success);
        assert.isString(res.data.folder.paNumber, 'folder panumber is: ' + res.data.folder.paNumber);
  
        //then update folder
        var txt = 'updated folder - ' + moment().format('MM-DD-YYYY:hh:mm:ss');
        var req = {
          apiKey: config.apikey,
          data: {
            folder: {
              paNumber: res.data.folder.paNumber,
              name: txt,
              description: txt
            }
          }
        };
  
        permanent.folder.update(req).then(function (response) {
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
  
    it('should not update a folder if no permissions', function (done) {
  
      var req = {
        apiKey: config.apikey,
        data: {
          folder: {
            paNumber: '0004-0006',
            name: 'new folder - ' + moment().format('MM-DD-YYYY:hh:mm:ss'),
            description: 'the folder description'
          }
        }
      };
  
      permanent.folder.update(req).then(function (response) {
        var res = response.data;
        assert.isTrue(res.httpcode == 401);
        assert.isFalse(res.success);
        assert.isTrue(res.error == 'access_denied');
  
        done();
  
      });
  
    });
  
  
  });
  