const RecipeRecommendation = require('../../domain/Recipes/entities/RecipeRecommendation');
const RequestIngredients = require('../../domain/Recipes/entities/RequestIngredients');

class RecipeUseCase {
  constructor({recipeService, authService }) {
    this._recipeService = recipeService;
    this._authService = authService;
  }
  async execute(payload,token) {
    await this._authService.checkAvailabilityToken(token);
    const ingredients = new RequestIngredients(payload);
    const information = await this._recipeService.recommendation({...ingredients})
    const bestRecipeRecommendation = new RecipeRecommendation(information)
    return bestRecipeRecommendation;
  }
}

module.exports = RecipeUseCase;