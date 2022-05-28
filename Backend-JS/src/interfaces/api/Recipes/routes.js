const routes = (handler) => [
  {
    method:'GET',
    path: '/recipes',
    handler: handler.getBestRecipesHandler,
    options: {
      auth: 'jwtUntukNutriA',
    }
  },
  {
    method: 'GET',
    path: '/recipes/{param*}',
    handler: {
      directory: {
        path: 'src/assets/fotoResep'
      },
    },
  },
];

module.exports = routes;