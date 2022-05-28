const PutUserFactory = require("../../domain/User/entities/PutUserFactory");

class EditUserUseCase {
  constructor({userService, authService }) {
    this._userService = userService;
    this._authService = authService;
  }
  async execute(payloads, id, isRegister,token) {
    const factory = new PutUserFactory();
    const { refreshToken } = payloads;
    await this._authService.checkAvailabilityToken(token);
    delete payloads.refreshToken;
    const putUser = factory.factory(isRegister,payloads);
    delete putUser.type;
    await this._userService.updateUserById(id, putUser);
    if (isRegister) {
      await this._authService.deleteToken(refreshToken); 
    }
  }
}

module.exports = EditUserUseCase;