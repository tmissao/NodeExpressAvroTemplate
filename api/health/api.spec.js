const request = require('request');
const app = require('../../app');
const config = require('../../config/config');
const router = require('./router');
const models = require('./model');

const BASE_URL = config.app.getPath(router.path);

describe('Health API', () => {
  let server;

  beforeAll(() => {
    server = app.listen(config.app.port);
  });

  afterAll(() => {
    server.close();
  });

  describe('GET /health', () => {
    const data = {};

    beforeAll((done) => {
      const options = {
        method: 'GET',
        uri: BASE_URL,
        encoding: null
      };

      request.get(options, (err, res, body) => {
        if (err) { throw new Error('Request Error'); }
        data.status = res.statusCode;
        data.body = models.healthType.fromBuffer(body);
        done();
      });
    });

    it('Status 200', () => {
      expect(data.status).toBe(config.requestCodes.OK);
    });

    it('Body', () => {
      const { status, message } = data.body;
      expect(status).toBe(200);
      expect(message).toBe('AVRO Working !!!');
    });
  });
});
