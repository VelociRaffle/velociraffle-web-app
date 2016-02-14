import './welcome.scss';
import template from './welcome.html';
import {WelcomeController as controller} from './welcome.controller';

export const welcomeDirective = () => {
  return {
    template,
    controller,
    controllerAs: 'vm',
    scope: {},
    restrict: 'E',
    replace: true
  };
};
