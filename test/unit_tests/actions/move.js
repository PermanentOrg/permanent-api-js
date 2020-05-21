
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


describe('/move', function () {

  it('should move records into a folder', function (done) {

    //ADD A FILE TO MYFILES ROOT FOLDER
    var filepath = path.join(__dirname, '../../assets/permanentlogo.png');
    var recReq = {
      data: {
        archive: {
          paNumber: config.test_archive_paNumber
        },
        record: {
          name: 'FILE TO MOVE - ' + moment().format('MM-DD-YYYY:hh:mm:ss')
        }
      },
      file: {
        name: "permanent-logo.png",
        filepath: filepath,
        contentType: mime.lookup('.png')
      },
    };


    permanent.record.add(recReq).then(function (recResp) {
      assert.isTrue(recResp.success);
      assert.isNotEmpty(recResp.data.record.paNumber);
      assert.isString(recResp.data.record.paNumber, 'new archive number is: ' + recResp.data.record.paNumber);

      //ADD FOLDER TO MY FILES ROOT FOLDER
      var folderReq = {
        data: {
          archive: {
            paNumber: config.test_archive_paNumber,
          },
          folder: {
            name: 'FOLDER FOR MOVE - ' + moment().format('MM-DD-YYYY:hh:mm:ss'),
          }
        }
      };

      permanent.folder.add(folderReq).then(function (folderResp) {

        assert.isTrue(folderResp.success);
        assert.isString(folderResp.data.folder.paNumber, 'folder panumber is: ' + folderResp.data.folder.paNumber);

        var copyReq = {
          data:
            [
              {
                source: recResp.data.record.paNumber,
                destination: folderResp.data.folder.paNumber
              }
            ]
        };

        setTimeout(function () {
          permanent.move(copyReq).then(function (response) {
            assert.isTrue(response.httpcode == 200);
            assert.isTrue(response.success);
            assert.isEmpty(response.error);
            assert.isEmpty(response.message);

            done();
          });
        }, 20000);  //allow time for processing
        
      });
    });
  });




});
