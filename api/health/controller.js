const model = require('./model');

const _health = (req, res) => {
  const type = model.healthType;
  const response = { status: 200, message: 'AVRO Working !!!' };
  const buffer = type.toBuffer(response);

  res.contentType('application/octet-stream');

  return res.send(buffer);
};

const getController = () => ({
  health: (req, res, next) => _health(req, res, next)
});


module.exports.getController = getController;
