
var
  util = require('util'),
  fs = require('fs'),
  path = require('path'),
  assert = require('chai').assert,
  addContext = require('mochawesome/addContext'),
  mime = require('mime-types'),
  permanent = require('../../index')('87f6e0344de0a8aea82fff2aa037')
  ;


describe('Records', function () {

  before(function () {
    // runs before all tests in this block
    return assert.isTrue(permanent.Init);
  });

  it('permanent.addRecord() should upload a file', function (done) {
    // addContext(this,'some context');
    var owner_permanent_archive_number = '06fj-0000';
    var filepath = path.join(__dirname, '../assets/permanentlogo.png');
    var thefileInfo = { filename: 'permanent-logo.png', path: filepath, mimetype: mime.lookup('.png') };
    var record = {
      file: new permanent.File(thefileInfo),
      archive_number: owner_permanent_archive_number,
      originalname: 'permanent-logo.png',
      filehandle: 'permanent-logo'
    };

    // console.log('record.file ' + util.inspect(record.file));

    permanent.addRecord(record).then(function (res) {
      assert.isTrue(res.success);
      // {
      //   success: true,
      //   error: '',
      //   message: '',
      //   data: { record: { recordArchiveNumber: '06f9-000e' } }
      // };
      done();
    });
  });


  it('permanent.getRecord() should return a record', function (done) {
    // addContext(this,'some context');
    assert.fail('not done');
    // permanent.getRecord({ archive_number: '06f9-0006' }).then(function (res) {
    //   console.log('end....');
    //   // console.log(util.inspect(res));
    //   assert.isTrue(res.success);
    //   done();
    // });
  });


});
