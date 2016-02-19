import {activeRafflesDirective} from './active.raffles.directive';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import {shared} from '../../shared/shared';
import {raffle} from './raffle/raffle';

const activeRafflesRoute = ($stateProvider) => {
  $stateProvider.state('active-raffles', {
    url: '/active-raffles',
    template: '<active-raffles></active-raffles>'
  });
};

activeRafflesRoute.$inject = ['$stateProvider'];

export const activeRaffles = angular.module('activeRaffles', [
    uiRouter,
    shared.name,
    raffle.name
  ])
  .config(activeRafflesRoute)
  .directive('activeRaffles', activeRafflesDirective);
