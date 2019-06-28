class ResponseMock {
  constructor(sendCallback) {
    this._sendCallback = sendCallback;
  }

  getMock() {
    return {
      send: this._sendCallback ? jasmine.createSpy().and.callFake(this._sendCallback)
        : jasmine.createSpy(),
      contentType: jasmine.createSpy()
    };
  }
}

module.exports = ResponseMock;
