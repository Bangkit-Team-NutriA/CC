const ReturnData = require('../../domain/User/entities/ReturnData');
class GetUserUseCase {
  constructor({userService, authService }) {
    this._userService = userService;
    this._authService = authService;
  }
  async execute(id,token) {
    await this._authService.checkAvailabilityToken(token);
    const data =  await this._userService.detailUserById(id);
    delete data.password;
    delete data.id;
    delete data.email;
    const returnData = new ReturnData(data);
    delete returnData.type;
    return returnData;
  }
}

module.exports = GetUserUseCase;