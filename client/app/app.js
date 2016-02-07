// Base CSS
import 'normalize.css';
import '../stylesheets/bootstrap.scss';

// App modules
import {appDirective} from './app.directive';
import {defaultRoute} from './app.default.route';

// Modules for this file
import angular from 'angular';
import uiRouter from 'angular-ui-router';

angular
  .module('vr', [
    uiRouter
  ])
  .directive('app', appDirective)
  .config(defaultRoute);
