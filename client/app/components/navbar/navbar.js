import {navbarDirective} from './navbar.directive';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import {shared} from '../../shared/shared';

export const navbar = angular.module('navbar', [
    uiRouter,
    shared.name
  ])
  .directive('navbar', navbarDirective);
