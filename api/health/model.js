const avro = require('avsc');

module.exports.healthType = avro.Type.forSchema({
  type: 'record',
  fields: [
    { name: 'status', type: 'int' },
    { name: 'message', type: 'string' }
  ]
});
