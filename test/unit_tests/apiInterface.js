
var
  assert = require('chai').assert,
  addContext = require('mochawesome/addContext'),
  config=require('../config.json'),
  permanent = require('../../index')(config.apikey)
  ;


describe('The Permanent-api-js interface ', function () {

  before(function () {
    // runs before all tests in this block
    return assert.isTrue(permanent.Init);
  });

  it('is initialized', function () {
    addContext(this, 'test if the api is initialized properly');
    return assert.isTrue(permanent.Init);
  });

  it('should be able to gen top level methods', function () {
    //Archive
    assert.strictEqual(typeof permanent.createArchive, 'function');
    assert.strictEqual(typeof permanent.getArchive, 'function');
    assert.strictEqual(typeof permanent.updateArchive, 'function');
    assert.strictEqual(typeof permanent.deleteArchive, 'function');
    
    //Record
    assert.strictEqual(typeof permanent.getRecord, 'function');
    assert.strictEqual(typeof permanent.addRecord, 'function');

    //Folders
    assert.strictEqual(typeof permanent.getFolder, 'function');
    assert.strictEqual(typeof permanent.addFolder, 'function');

    //events
    assert.strictEqual(typeof permanent.Events.initfailed, 'string');
    assert.strictEqual(typeof permanent.Events.init, 'string');

    //File object
    assert.strictEqual(typeof permanent.File, 'function');

    addContext(this, 'new permanent.Record() is for adding file data to insert a record');
    var rec = new permanent.File();
    assert.strictEqual(typeof rec, 'object');

  });

  

});
