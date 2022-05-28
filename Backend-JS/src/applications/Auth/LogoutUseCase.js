class LogoutUseCase {
  constructor({authService }) {
    this._authService = authService;
  }
  async execute(payloads) {
    const token = payloads;
    await this._authService.checkAvailabilityToken(token);
    await this._authService.deleteToken(token);
  }
}
module.exports = LogoutUseCase;