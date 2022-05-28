const RecipeUseCase = require("../../../applications/Recipes/RecipeUseCase");
const dataRecipe = require('../../../assets/resep/dataRecipe.json');
class RecipeHandler {
  constructor(container) {
    this._container = container;
    this.getBestRecipesHandler = this.getBestRecipesHandler.bind(this);
  }
  async getBestRecipesHandler(request) {
    const params = request.query;
    const domain = request.url.origin
    const payload = params['ingredients'].map((number) => parseInt(number));
    const recipeUseCase = this._container.getInstance(RecipeUseCase.name)
    const token = request.auth.artifacts.token;
    const informasi = await recipeUseCase.execute(payload,token);
    const dataIndexRecipe = informasi.recommendation.data;
    var dataObjectRecipe = [];
    Object.assign([],dataIndexRecipe).forEach(elem => {
      let dataObject = Object.assign({},dataRecipe[elem])
      dataObject['Url'] = `${domain}/recipes/${dataObject['Nama']}.jpg`
      dataObjectRecipe.push(dataObject);
    })
    return {
      status:'success',
      data: dataObjectRecipe
    }
  }
}
module.exports = RecipeHandler;