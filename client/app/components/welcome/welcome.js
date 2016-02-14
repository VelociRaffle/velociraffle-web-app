import {welcomeDirective} from './welcome.directive';
import angular from 'angular';
import uiRouter from 'angular-ui-router';

const welcomeRoute = ($stateProvider) => {
  $stateProvider.state('welcome', {
    url: '/',
    template: '<welcome></welcome>'
  });
};

welcomeRoute.$inject = ['$stateProvider'];

export const welcome = angular.module('welcome', [
    uiRouter
  ])
  .config(welcomeRoute)
  .directive('welcome', welcomeDirective);
