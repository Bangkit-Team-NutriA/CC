class NewAuth {
  constructor(payload) {
    this._verifyPayload(payload);
    this.accessToken =  payload.accessToken;
  }
  _verifyPayload({ accessToken}) {
    if (!accessToken) {
      throw new Error('Can\'t empty parameter');
    }
    if(typeof accessToken !== 'string') {
      throw new Error('wrong type of parameter');
    }
  }
}
module.exports = NewAuth;