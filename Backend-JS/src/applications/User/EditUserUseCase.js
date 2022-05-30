const PutOldUser = require("../../domain/User/entities/PutOldUser");

class EditUserUseCase {
  constructor({userService, authService }) {
    this._userService = userService;
    this._authService = authService;
  }
  async execute(payloads, id, isRegister,token) {
    const { refreshToken } = payloads;
    await this._authService.checkAvailabilityToken(token);
    delete payloads.refreshToken;
    new PutOldUser(payloads)
    delete putUser.type;
    await this._userService.updateUserById(id, putUser);
    if (isRegister) {
      await this._authService.deleteToken(refreshToken); 
    }
  }
}

module.exports = EditUserUseCase;