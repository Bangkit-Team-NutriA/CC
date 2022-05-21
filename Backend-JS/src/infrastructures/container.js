const { createContainer } = require('instances-container');
//usercase
const ImageUseCase = require('../applications/predict/ImageUseCase');
const CalculatorUseCase = require('../applications/Calculator/CalculatotUseCase');
const MealUseCase = require('../applications/Meals/MealUseCase');
const RecipeUseCase = require('../applications/Recipes/RecipeUseCase');
//Helper
const Fetching = require('../applications/Fetching/Fetching');
//domain
const Food = require('../domain/Predict/Food');
const Image = require('../domain/Image/Image');
const Calcultor = require('../domain/Calculator/Calculator');
const Meal = require('../domain/Meals/Meals');
const Recipes = require('../domain/Recipes/Recipe');
// service
const FoodPredict = require('./modelPredict/ImagePredict');
const ImageService = require('./modelPredict/ImageService');
const RecipesService = require('../infrastructures/Recipes/RecipesService');
const CalculatorService = require('../infrastructures/Calculator/CalculatorService');
const MealService = require('../infrastructures/Meals/MealService');
const container = createContainer();
container.register([
  {
    key: Food.name,
    Class: FoodPredict
  },
  {
    key: Image.name,
    Class: ImageService,
  },
  {
    key: Calcultor.name,
    Class: CalculatorService,
  },
  {
    key: Fetching.name,
    Class: Fetching,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'url',
          concrete: process.env.FLASK_URL
        }
      ]
    }
  },
  {
    key: Meal.name,
    Class: MealService,
    parameter: {
      injectType: 'parameter',
      dependencies: [
        {
          internal: Fetching.name
        }
      ]
    }
  },
  {
    key: Recipes.name,
    Class: RecipesService,
    parameter: {
      injectType: 'parameter',
      dependencies: [
        {
          internal: Fetching.name
        }
      ]
    }
  },
]);
container.register([
  {
    key: ImageUseCase.name,
    Class: ImageUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'imageService',
          internal: Image.name
        },
        {
          name: 'predictService',
          internal: Food.name,
        },
      ]    
    }
  },
  {
    key: CalculatorUseCase.name,
    Class: CalculatorUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies:[
        {
          name: 'calculatorService',
          internal: Calcultor.name
        }
      ]
    }
  },
  {
    key: MealUseCase.name,
    Class: MealUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'calculatorUseCase',
          internal: CalculatorUseCase.name
        },
        {
          name: 'mealService',
          internal: Meal.name
        }
      ]
    }
  },
  {
    key: RecipeUseCase.name,
    Class: RecipeUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'recipeService',
          internal: Recipes.name
        }
      ]
    }
  }
])
module.exports = container;