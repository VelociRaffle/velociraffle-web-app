import './active.raffles.scss';
import template from './active.raffles.html';
/* jscs:disable */
import {ActiveRafflesController as controller} from './active.raffles.controller';
/* jscs:enable */

export const activeRafflesDirective = () => {
  return {
    template,
    controller,
    controllerAs: 'vm',
    scope: {},
    restrict: 'E',
    replace: true
  };
};
