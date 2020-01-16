
var
  assert = require('chai').assert,
  addContext = require('mochawesome/addContext'),
  permanent = require('../../index')('87f6e0344de0a8aea82fff2aa037')
  ;


describe('Records', function () {

  before(function () {
    // runs before all tests in this block
    return assert.isTrue(permanent.Init);
  });

  it('getFile will return a file', function (done) {
    addContext(this,'some context');

    permanent.getFile({ archive_number: '06f9-0006' }).then(function (res) {
      console.log('end....');
      // console.log(util.inspect(res));
      assert.isTrue(res.success);
      done();
    });
  });


});
