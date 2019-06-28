# Express Avro Template
A express template to work with AVRO

## What is Avro?
Avro is a row-oriented remote procedure call and data serialization framework developed within Apache's Hadoop project. It uses JSON for defining data types and protocols, and serializes data in a compact binary format

## Avro Schema ( Datatypes )
* [Avro Schemas](https://avro.apache.org/docs/1.8.2/spec.html#schemas)
* [Avro Primitive Types] (https://avro.apache.org/docs/1.8.2/spec.html#schema_primitive)
* [Avro Complex Types] (https://avro.apache.org/docs/1.8.2/spec.html#schema_complex)
* [Avro Example] (https://docs.oracle.com/database/nosql-12.1.3.2/GettingStartedGuide/avroschemas.html)

## Avro Node Library
* [avsc] (https://github.com/mtth/avsc)

## How does it work ?
This project creates a REST endpoint returning an AVRO buffer response. In order were built the following resources:

1. An Avro Schema Model (__/api/health/model.js__)
```javascript
const avro = require('avsc');

module.exports.healthType = avro.Type.forSchema({
  type: 'record',
  fields: [
    { name: 'status', type: 'int' },
    { name: 'message', type: 'string' }
  ]
});

```

2. An Endpoint (__/api/health/router.js__) and a controller (__/api/health/controller.js__)
```javascript
/*
  Controller.js
*/
const model = require('./model');

const _health = (req, res) => {
  const type = model.healthType;
  const response = { status: 200, message: 'AVRO Working !!!' };

  // encodes json to buffer
  const buffer = type.toBuffer(response);

  // Sets response as a Byte Stream
  res.contentType('application/octet-stream');

  return res.send(buffer);
};

const getController = () => ({
  health: (req, res, next) => _health(req, res, next)
});
module.exports.getController = getController;
```
```javascript
/*
  Router.js
*/
const express = require('express');
const controller = require('./controller');

const PATH = '/health';

const router = express.Router();

router.get('/', controller.getController().health);

module.exports = { path: PATH, router };
```

## Running
This project uses Docker, so it can be executed through the following command:
```bash
docker-compose up
```

After the endpoint will be accessible on:

__GET - localhost:3000/health__

 it is important to highlight that since this is a binary stream response your web browser will not handle the response in the right way, so it will not working on web browser. However it is possible to show the correct response using axios or other request library that can handle buffer response and decode it using Avro schema that was created.

 ```javascript
 /*
  Request Demo

  npm install axios --save (request library)
  npm install avsc --save (avro library)
 */

const axios = require('axios');
const model = require('./model'); // avro schema

const instance = axios.create({baseURL: 'http://localhost:3000'})

instance.get('/health', {responseType: 'arraybuffer'})
    .then(function (response) {
      const type = model.healthType

      // decodes buffer
      let msg = type.fromBuffer(response.data)

      console.log('Decoded message', msg)
    })
 ```
