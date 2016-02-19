import {raffleDirective} from './raffle.directive';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import {shared} from '../../../shared/shared';

export const raffle = angular.module('raffle', [
    uiRouter,
    shared.name
  ])
  .directive('raffle', raffleDirective);
