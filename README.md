# permanent-api-js

## Documentation Preview Here
https://permanent-legacy-foundation.github.io/permanent-api-js/


## What is it?
A REST API wrapper for server-side javascript applications

## What is permanent?
[Permanent.org](https://www.permanent.org) is a trusted platform for individuals, families and small organizations that provides a secure and private environment to build and share archival quality history with family, friends, colleagues and the public, at their complete discretion. Permanent.org is the world’s first consumer-grade, secure cloud storage service backed by a 501(c)3 nonprofit organization: the Permanent Legacy Foundation.

## What can I do?
The current API supports...
  - Creating archives
  - Uploading files to an archive 



## Getting started
    1. Create account on https://www.permanent.org
    2. Contact us to get an API key - support@permanent.org

## Install

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/package/permanent-api-js).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).


    npm install permanent-api-js
    
    After installing, create a file in server app root folder 
    called envVars.txt. Add the API key to the file.
    
    PERMANENTORG_APIKEY=your-api-from-support@permanent.org

## Tests
After downloading run the tests to see the results and learn about the interfaces.

    Register with permanent.org and request an APIKEY
    to see all greens.

All Tests: npm test
Unit Tests: npm run-script unit_tests
Functional Tests: npm run-script functional_tests

## Usage

Set your API key to the environment variable process.env.PERMANENTORG_APIKEY  
var permanent = require('permanent-api-js');

or pass API key
var permanent = require('permanent-api-js')('YOUR_API_KEY');

Then see the docs https://permanent-legacy-foundation.github.io/permanent-api-js/

