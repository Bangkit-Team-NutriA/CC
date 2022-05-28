const CalculatorUseCase = require('../../../applications/Calculator/CalculatotUseCase');

class CalculatorHandler {
  constructor(container) {
    this._container = container;
    this.GetCalculateHandler = this.GetCalculateHandler.bind(this);
  }
  async GetCalculateHandler(request) {
    const payload = request.query;
    payload['weight'] = parseInt(payload['weight'])
    payload['height'] = parseInt(payload['height'])
    payload['timesOfExercise'] = parseInt(payload['timesOfExercise'])
    payload['age'] = parseInt(payload['age'])
    const calculatorUseCase = this._container.getInstance(CalculatorUseCase.name)
    const token = request.auth.artifacts.token;
    const information = await calculatorUseCase.execute(payload,token)
    return {
      'status':'success',
      information
    }
  }
}

module.exports = CalculatorHandler;