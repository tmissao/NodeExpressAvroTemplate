const controller = require('./controller');
const ResponseMock = require('../../spec/mocks/ResponseMock');
const ErrorMock = require('../../spec/mocks/ErrorMock');
const models = require('./model');

describe('Testing Health Controller', () => {
  it('Successful Health', () => {
    const result = models.healthType.fromBuffer(models.healthType.toBuffer({ status: 200, message: 'AVRO Working !!!' }));
    const req = {};
    const next = new ErrorMock().getMock();
    const res = new ResponseMock((output) => {
      expect(result).toEqual(models.healthType.fromBuffer(output));
      expect(next.calls.any()).toEqual(false);
    }).getMock();

    controller.getController().health(req, res, next);
  });
});
