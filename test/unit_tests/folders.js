
var
assert = require('chai').assert,
addContext = require('mochawesome/addContext'),
permanent = require('../../index')('87f6e0344de0a8aea82fff2aa037')
;


describe('Folder', function () {

before(function() {
  // runs before all tests in this block
  return assert.isTrue(permanent.Init);
});

it('permanent.addFolder() should add a folder');

it('permanent.getFolder() should get a folder');

it('permanent.deleteFolder() should delete a folder');


});
