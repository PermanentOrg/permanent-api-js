
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


  describe('/record/add', function () {
     
    it('should upload a file', function (done) {
  
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
        assert.isString(res.data.record.paNumber, 'new archive number is: ' + res.data.record.paNumber);
        done();
      });
  
    });
  
    it('should upload a file with all data values', function (done) {
  
      var filepath = path.join(__dirname, '../../assets/permanentlogo.png');
      var req = {
        data: {
          archive: {
            paNumber: config.test_archive_paNumber
          },
          record: {
            name: 'permanent-logo - ' + moment().format('MM-DD-YYYY:hh:mm:ss'),
            description: 'a test file uploaded on ' + moment().format('MM-DD-YYYY:hh:mm:ss'),
            location: {
              name: '',
              streetNumber: '4611',
              streetName: 'Bee Caves Road',
              postalCode: '78746',
              locality: 'West Lake Hills',
              adminOneName: 'Texas',
              adminOneCode: 'TX',
              adminTwoName: 'Travis County',
              adminTwoCode: 'Travis County',
              country: 'United States',
              countryCode: 'US',
              latitude: '30.286603',
              longitude: '-97.814744'
            }
          }
        },
        file: {
          name: "permanent-logo.png",
          filepath: filepath,
          contentType: mime.lookup('.png')
        }
      };
  
  
      permanent.record.add(req).then(function (res) {
        assert.isTrue(res.success);
        assert.isTrue(res.httpcode == 200);
        assert.isEmpty(res.error);
        assert.isEmpty(res.message);
        assert.isObject(res.data);
        assert.isObject(res.data.record);
        assert.isNotEmpty(res.data.record.paNumber);
        assert.isString(res.data.record.paNumber, 'new archive number is: ' + res.data.record.paNumber);
        done();
      });
    });
  
  
  
  });
  