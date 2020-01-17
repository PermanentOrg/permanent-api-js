
var
  util = require('util'),
  assert = require('chai').assert,
  addContext = require('mochawesome/addContext'),
  permanent = require('../../index')('87f6e0344de0a8aea82fff2aa037')
  ;


describe('Archive', function () {

  before(function () {
    // runs before all tests in this block
    return assert.isTrue(permanent.Init);
  });

  it.skip('permanent.createArchive() should create an archive', function (done) {
    // addContext(this, 'given an archive number will return archive data');
    var myarchive = { "name": "test-archive-116" };
    permanent.createArchive(myarchive).then(function (permres) {
      assert.isTrue(permres.success);
      assert.isString(permres.data.archiveNbr, 'new archive number is: ' + permres.data.archiveNbr);
      done();
    });
  });

  it('permanent.getArchive() should fetch an archive');
  // permanent.getArchive({archive_number: '06fj-0000'}).then(function(res){
  //   console.log('end....');
  //   // console.log(util.inspect(res));
  //   assert.isTrue(res.success);
  //   done();
  // });

  it('permanent.updateArchive() should update an archive');

  it('permanent.deleteArchive() should delete an archive');




});
