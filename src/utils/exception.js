class ResponseException {
  constructor(message) {
    this.message = message;
  }

  toString() {
    return (this.message.toString());
  }
}

module.exports = { ResponseException };
