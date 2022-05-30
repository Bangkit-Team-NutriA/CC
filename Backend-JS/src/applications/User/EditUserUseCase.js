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
    const putUser = new PutOldUser(payloads)
    delete putUser.type;
    await this._userService.updateUserById(id, putUser);
  }
}

module.exports = EditUserUseCase;