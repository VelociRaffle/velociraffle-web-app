import './raffle.scss';
import template from './raffle.html';
import {RaffleController as controller} from './raffle.controller';

export const raffleDirective = () => {
  return {
    template,
    controller,
    controllerAs: 'vm',
    scope: {
      raffle: '='
    },
    bindToController: true,
    restrict: 'EA',
    replace: true
  };
};
