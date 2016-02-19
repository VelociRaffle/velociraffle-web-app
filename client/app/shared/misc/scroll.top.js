const scrollTop = ($rootScope) => {
  $rootScope.$on('$stateChangeSuccess', () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
};

scrollTop.$inject = ['$rootScope'];

export {scrollTop};
