import './<%= dottedName %>.scss';
import template from './<%= dottedName %>.html';
import {<%= titleCaseName %>Controller as controller} from './<%= dottedName %>.controller';

export const <%= camelCaseName %>Directive = () => {
  return {
    template,
    controller,
    controllerAs: 'vm',
    scope: {},
    restrict: 'E',
    replace: true
  };
};
