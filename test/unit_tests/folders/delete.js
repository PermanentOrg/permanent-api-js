
var
  util = require('util'),
  assert = require('chai').assert,
  addContext = require('mochawesome/addContext'),
  moment = require('moment'),
  common = require('../../common'),
  config = require('../../config.json'),
  permanent = require('../../../index')(config.apikey)
  ;


  
describe('/folder/delete', function () {

  it('should delete a folder', function (done) {

    //add folder first
    var req = {
      data: {
        archive: {
          paNumber: config.test_archive_paNumber,
        },
        folder: {
          name: 'new folder for get test - ' + moment().format('MM-DD-YYYY:hh:mm:ss')
        }
      }
    };

    permanent.folder.add(req).then(function (response) {
      var res = response.data;
      assert.isTrue(res.success);
      assert.isString(res.data.folder.paNumber, 'folder panumber is: ' + res.data.folder.paNumber);

      //then delete the new folder
      var req = {
        data: {
          folder: {
            paNumber: res.data.folder.paNumber,
          }
        }
      };
  
      permanent.folder.delete(req).then(function (response2) {
        var res2 = response2.data;
        assert.isTrue(response2.statusCode == 200);
        assert.isTrue(res2.success);
        // assert.isTrue(res.data.folder.paNumber==res2.data.folder.paNumber);
        done();
      });
    });

  });

  
  
  it('should not delete a folder when no access', function (done) {

      //then get the new folder
      var req = {
        data: {
          folder: {
            paNumber: '0004-0006',
          }
        }
      };
  
    
      permanent.folder.delete(req).then(function (response) {
        var res = response.data;
        assert.isTrue(res.httpcode == 401);
        assert.isFalse(res.success);
        assert.isTrue(res.error == 'access_denied');
        done();
      });

  });

  it('should return error when no folder pa given', function (done) {

    //then get the new folder
    var req = {
      data: {
        folder: {
          paNumber: '',
        }
      }
    };

  
    permanent.folder.delete(req).then(function (response) {
      var res = response.data;
      assert.isTrue(res.httpcode == 400);
      assert.isFalse(res.success);
      assert.isTrue(res.error == 'no_folder');
      done();
    });

});


});
