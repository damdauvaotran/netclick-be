class ResponseException {
  constructor(message) {
    this.message = message;
  }

  toString() {
    return (this.message);
  }
}

module.exports = { ResponseException };
