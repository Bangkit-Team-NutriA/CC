const NewUser = require('../../domain/User/entities/NewUser');

class AddUserUseCase {
  constructor({ tokenManager, hashManager, userService, authService }) {
    this._tokenManager = tokenManager;
    this._hashManager = hashManager;
    this._userService = userService;
    this._authService = authService;
  }
  async execute(payloads) {
    const payload = new NewUser(payloads);
    await this._userService.verifyAvailableEmail(payload.email);
    payload.password = await this._hashManager.hash(payload.password);
    const id = await this._userService.addUser(payload);
    const email = payload.email;
    return {
      id,
      email
    };
  }
}

module.exports = AddUserUseCase;