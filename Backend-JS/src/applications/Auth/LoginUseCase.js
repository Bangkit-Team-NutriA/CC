const LoginAuth = require("../../domain/Authentications/entities/LoginAuth");
const NewAuth = require('../../domain/Authentications/entities/NewAuth');

class LoginUseCase {
  constructor({ tokenManager, hashManager, userService, authService }) {
    this._tokenManager = tokenManager;
    this._hashManager = hashManager;
    this._userService = userService;
    this._authService = authService;
  }
  async execute(payloads) {
    const payload = new LoginAuth(payloads);
    const email = payload.email;
    delete payload._re;
    const hashedPassword = await this._userService.getPasswordByEmail(email);
    await this._hashManager.comparePassword(payload.password, hashedPassword)
    const id = await this._userService.getIdByEmail(email);
    const accessToken = await this._tokenManager.createAccessToken({
      email,
      id,
    });
    const newAuth = new NewAuth({
      accessToken
    })
    await this._authService.addToken(newAuth.accessToken);
    return newAuth.accessToken;
  }
}
module.exports = LoginUseCase;