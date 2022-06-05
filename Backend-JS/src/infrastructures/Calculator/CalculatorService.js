const Calculator = require('../../domain/Calculator/Calculator');
// https://www.mymealcatering.com/kesehatan/inilah-cara-menghitung-akg-yang-benar.html
// https://www.halodoc.com/artikel/jangan-salah-ini-cara-tepat-menghitung-kebutuhan-kalori
class CalculatorService extends Calculator {
  constructor() {
    super()
  }
  calculate(payload) {
    let calculateResult = {}
    console.log(payload);
    if (payload.sex) {
      const calories = (88.4 + (13.4 * payload.weight) + (4.8 * payload.height) - (5.68 * payload.age)) * payload.timesOfExercise;
      const fat = (0.15* calories)/9;
      const carbo = (0.6 * calories)/4;
      const protein = (0.15 * calories)/4;
      calculateResult = {
        calories,
        fat,
        carbo,
        protein
      }
      return calculateResult
    } else {
      console.log(payload)
      const calories = (447.6 + (9.25 * payload.weight) + (3.1 * payload.height) - (4.33 * payload.age)) * payload.timesOfExercise;
      const fat = (0.15* calories)/9;
      const carbo = (0.6 * calories)/4;
      const protein = (0.15 * calories)/4;
      calculateResult = {
        calories,
        fat,
        carbo,
        protein
      }
      return calculateResult
    }
  }
}
module.exports = CalculatorService;