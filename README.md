# permanent-api-js

## What is it?
A REST API wrapper for server-side javascript applications

## What is permanent?
Permanent.org is a digital file preservation platform - built for all of humankind to archive their digital legacies, permanently. 

## What can I do?
The current API supports...
  - Creating archives
  - Uploading files to an archive 



## Getting started
    1. Create account on https://www.permanent.org
    2. Contact us to get an API key - support@permanent.org

## Install

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).


    npm install permanent-api-js
    
    After installing, create a file in server app root folder called envVars.txt. Add the API key to the file.
    
    PERMANENTORG_APIKEY=your-api-from-support@permanent.org


## Usage

### Create an archive
```js
var permanent = require('permanent-api-js');
var myarchive = {"name":"name-of-archive"};

permanent.createArchive(myarchive).then(function (permres) {
  if (permres.success) { 
    var myNewArchiveNumber = permres.data.archiveNbr;
  }
});
```    

### Upload a File
```js
var permanent         = require('permanent-api-js');
var an_archive_number = 'xxxx-xxxx';
var theFile           = request.files[0];

var filereq = {
            file: new permanent.File(theFile),
            archive_number: an_archive_number,
            originalname: theFile.originalname,
            filehandle: 'filename'
          };

permanent.addFile(filereq).then(function (saveres) {
  if (saveres.success && saveres.data) {
   var file_archive_number = saveres.data.record.recordArchiveNumber;
  }
});

```

### Get File
```js
var permanent           = require('permanent-api-js');
var file_archive_number ='xxxx-xxxx';

permanent.getFile({ archive_number: file_archive_number }).then(function (permres) {
  if (permres.success) {
    var filedata = permres.data.record;
  }
});
```