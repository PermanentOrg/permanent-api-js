
var
  util = require('util'),
  assert = require('chai').assert,
  addContext = require('mochawesome/addContext'),
  moment = require('moment'),
  common = require('../../common'),
  config = require('../../config.json'),
  permanent = require('../../../index')(config.apikey)
  ;


describe('permanent.deleteArchive()', function () {

  before(function () {
    // runs before all tests in this block
    return assert.isTrue(permanent.Init);
  });

  it('should delete an archive given an archive number');
  // permanent.getArchive({archive_number: '06fj-0000'}).then(function(res){
  //   console.log('end....');
  //   // console.log(util.inspect(res));
  //   assert.isTrue(res.success);
  //   done();
  // });

  it('should return false when no archive number');

});
