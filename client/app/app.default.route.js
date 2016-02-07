const defaultRoute = ($urlRouterProvider) => {
  $urlRouterProvider.otherwise('/');
};

defaultRoute.$inject = ['$urlRouterProvider'];

export {defaultRoute};
