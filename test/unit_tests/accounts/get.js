
var
util = require('util'),
assert = require('chai').assert,
addContext = require('mochawesome/addContext'),
moment = require('moment'),
common = require('../../common'),
config = require('../../config.json'),
permanent = require('../../../index')(config.apikey)
;


describe('/account/get', function () {

it('should fetch account info', function (done) {
  var req = {
    data: {
    }
  };

  permanent.account.get(req).then(function (response) {
    var res = response.data;
    assert.isTrue(response.statusCode == 200);
    assert.isTrue(res.httpcode == '200');
    assert.isTrue(res.success);
    assert.isEmpty(res.error);
    assert.isEmpty(res.message);

    assert.isObject(res.data.account);
    assert.isNotEmpty(res.data.account.primaryEmail);
    assert.isNotEmpty(res.data.account.primaryPhone);
    assert.isNotEmpty(res.data.account.fullName);
    assert.isNotEmpty(res.data.account.address);
    assert.isNotEmpty(res.data.account.address2);
    assert.isNotEmpty(res.data.account.country);
    assert.isNotEmpty(res.data.account.city);
    assert.isNotEmpty(res.data.account.state);
    assert.isNotEmpty(res.data.account.zip);
    assert.isNotEmpty(res.data.account.archiveNbr);
    assert.isNotEmpty(res.data.account.status);
    assert.isNotEmpty(res.data.account.spaceLeft);
    assert.isNotEmpty(res.data.account.spaceTotal);



    done();
  });


});



});

