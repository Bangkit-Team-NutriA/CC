const CalculatorData = require('../../domain/Calculator/entities/CalculatorData');
const CalculatorResult = require('../../domain/Calculator/entities/CalculatorResult');

class CalculatorUseCase {
  constructor({ calculatorService,authService }) {
    this._calculatorService = calculatorService;
    this._authService = authService;
  }
  async execute(payload,token) {
    await this._authService.checkAvailabilityToken(token);
    const calculatorData = new CalculatorData(payload);
    const information = this._calculatorService.calculate(calculatorData);
    const calculatorResult = new CalculatorResult(information);
    return calculatorResult._getData();
  }
}

module.exports = CalculatorUseCase;