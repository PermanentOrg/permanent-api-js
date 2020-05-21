var
  util = require("util"),
  eventEmitter = require('events').EventEmitter,
  http = require('http'),
  request = require('request'),
  fs = require('fs'),
  querystring = require('querystring')
  ;


function permanent(apikey) {

  if (!apikey && !process.env.PERMANENTORG_APIKEY) {
    throw 'PERMANENTORG_APIKEY is required in envVars.txt';
  }

  var app_instance = this;
  var _hostname = 'http://localhost:9002';
  // var _hostname = 'https://devapi.permanent.org';

  var _API_KEY = apikey || process.env.PERMANENTORG_APIKEY;
  var apievents = {
    initfailed: 'permanent.initfailed',
    init: 'permanent.init'
  };

  this.Events = apievents;
  this.Init = false;

  var routes = {
    actions: {
      move: '/move',
      copy: '/copy'
    },
    archive: {
      add: '/archive/add',
      delete: '/archive/delete',
      get: '/archive/get',
      update: '/archive/update'
    },
    record: {
      add: '/record/add',
      delete: '/record/delete',
      get: '/record/get',
      update: '/record/update'
    },
    folder: {
      add: '/folder/add',
      delete: '/folder/delete',
      get: '/folder/get',
      update: '/folder/update'
    }
  };

  this.archive = {
    get: getArchive,
    add: addArchive,
    delete: deleteArchive,
    update: updateArchive
  };

  function getArchive(msg) {
    return post(routes.archive.get, msg);
  }
  function addArchive(msg) {
    return post(routes.archive.add, msg);
  }
  function deleteArchive(msg) {
    return post(routes.archive.delete, msg);
  }
  function updateArchive(msg) {
    return post(routes.archive.delete, msg);
  }

  this.folder = {
    get: getFolder,
    add: addFolder,
    delete: deleteFolder,
    update: updateFolder
  };

  function getFolder(msg) {
    return post(routes.folder.get, msg);
  }
  function addFolder(msg) {
    return post(routes.folder.add, msg);
  }
  function deleteFolder(msg) {
    return post(routes.folder.delete, msg);
  }
  function updateFolder(msg) {
    return post(routes.folder.delete, msg);
  }


  this.record = {
    get: getRecord,
    add: addRecord,
    delete: deleteRecord,
    update: updateRecord
  };

  function getRecord(msg) {
    return post(routes.record.get, msg);
  }
  function addRecord(msg) {
    return postMultiPart(routes.record.add, msg);
  }
  function deleteRecord(msg) {
    return post(routes.record.delete, msg);
  }
  function updateRecord(msg) {
    return post(routes.record.update, msg);
  }

  this.copy = function (msg) {
    return post(routes.actions.copy, msg);
  };

  this.move =function (msg) {
    return post(routes.actions.move, msg);
  };


  function init() {
    app_instance.Init = true;
  }


  function post(route, msg) {

    return new Promise(function (resolve, reject) {

      if (!_API_KEY) {
        reject('API_KEY is required');
        return;
      }

      if (!msg.apiKey) {
        msg.apiKey = _API_KEY;
      }

      var url = _hostname + route;
      var postData = querystring.stringify({ form: JSON.stringify(msg) });
      var response = '';
      var options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(postData)
        }
      };

      var req = http.request(url, options, function (res) {


        res.setEncoding('utf8');
        res.on('data', function (chunk) {
          response += chunk;
        });

        res.on('end', function (httpres) {
          // var responseData = {
          //   data: JSON.parse(response),
          //   statusCode: res.statusCode,
          //   headers: res.headers
          // };
          // resolve(responseData);
          resolve(JSON.parse(response));
        });

      });

      req.on('error', function (e) {
        resolve(e);
      });
      req.write(postData);
      req.end();
    });

  }

  function postMultiPart(route, msg) {
    return new Promise(function (resolve, reject) {
      if (!_API_KEY) {
        reject('API_KEY is required');
        return;
      }

      if (!msg.apiKey) {
        msg.apiKey = _API_KEY;
      }

      var url = _hostname + route;
      var formData = {
        form: JSON.stringify({ data: msg.data, apiKey: msg.apiKey })
      };

      formData[msg.file.name] = {
        value: fs.createReadStream(msg.file.filepath),
        options: {
          filename: msg.file.name,
          contentType: msg.file.contentType
        }
      };

      var postops = {
        preambleCRLF: true,
        postambleCRLF: true,
        url: url,
        formData: formData
      };

      request.post(postops, function (err, httpResponse, body) {
        if (err) {
          var ddd = err;
        }
        resolve(JSON.parse(body));
      })
        .on('error', function (err) {
          console.error(err);
        });

    });
  }

  init();

}


util.inherits(permanent, eventEmitter);

module.exports = function (apikey) { return new permanent(apikey); };