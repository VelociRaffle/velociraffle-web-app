// Base CSS
import 'normalize.css';
import '../stylesheets/bootstrap.scss';

// App modules
import {appDirective} from './app.directive';
import {defaultRoute} from './app.default.route';
import {shared} from './shared/shared';
import {welcome} from './components/welcome/welcome';

// Modules for this file
import angular from 'angular';
import uiRouter from 'angular-ui-router';

angular
  .module('vr', [
    uiRouter,
    shared.name,
    welcome.name
  ])
  .directive('app', appDirective)
  .config(defaultRoute);
