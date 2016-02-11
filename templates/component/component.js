import {<%= camelCaseName %>Directive} from './<%= dottedName %>.directive';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import {shared} from '../../shared/shared';

const <%= camelCaseName %>Route = ($stateProvider) => {
  $stateProvider.state('<%= spineCaseName %>', {
    url: '/<%= spineCaseName %>',
    template: '<div <%- spineCaseName %>></div>'
  });
};

<%= camelCaseName %>Route.$inject = ['$stateProvider'];

export const <%= camelCaseName %> = angular.module('<%= camelCaseName %>', [
    uiRouter,
    shared.name
  ])
  .config(<%= camelCaseName %>Route)
  .directive('<%= camelCaseName %>', <%= camelCaseName %>Directive);
