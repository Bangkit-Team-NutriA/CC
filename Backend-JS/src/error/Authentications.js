const ClientError = require('./ClientError');

class Authentication extends ClientError {
  constructor(message) {
    super(message, 401);
    this.name = 'AuthenticationError';
  }
}

module.exports = Authentication;
