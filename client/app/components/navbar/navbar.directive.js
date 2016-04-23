import './navbar.scss';
import template from './navbar.html';
import {NavbarController as controller} from './navbar.controller';

export const navbarDirective = () => {
  return {
    template,
    controller,
    controllerAs: 'vm',
    scope: {},
    restrict: 'E',
    replace: true
  };
};
