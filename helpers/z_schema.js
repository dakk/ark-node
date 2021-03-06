'use strict';

var ip = require('ip');
var z_schema = require('z-schema');

z_schema.registerFormat('hex', function (str) {
  try {
    new Buffer(str, 'hex');
  } catch (e) {
    return false;
  }

  return true;
});

z_schema.registerFormat('publicKey', function (str) {
  if (str.length === 0) {
    return true;
  }

  try {
    var publicKey = new Buffer(str, 'hex');
    return publicKey.length === 33;
  } catch (e) {
    return false;
  }
});

z_schema.registerFormat('vendorField', function (str) {
  if (str.length === 0) {
    return true;
  }

  try {
    var vendorField = new Buffer(str);

    return vendorField.length < 65;
  } catch (e) {
    return false;
  }
});

z_schema.registerFormat('csv', function (str) {
  try {
    var a = str.split(',');
    if (a.length > 0 && a.length <= 1000) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
});

z_schema.registerFormat('signature', function (str) {
  if (str.length === 0) {
    return true;
  }

  try {
    var signature = new Buffer(str, 'hex');
    return signature.length < 73;
  } catch (e) {
    return false;
  }
});

z_schema.registerFormat('queryList', function (obj) {
  obj.limit = 100;
  return true;
});

z_schema.registerFormat('delegatesList', function (obj) {
  obj.limit = 51;
  return true;
});

z_schema.registerFormat('parsedInt', function (value) {
  /*jslint eqeq: true*/
  if (isNaN(value) || parseInt(value) != value || isNaN(parseInt(value, 10))) {
    return false;
  }

  value = parseInt(value);
  return true;
});

z_schema.registerFormat('ip', function (str) {
  return ip.isV4Format(str);
});

// var registeredFormats = z_schema.getRegisteredFormats();
// console.log(registeredFormats);

// Exports
module.exports = z_schema;
