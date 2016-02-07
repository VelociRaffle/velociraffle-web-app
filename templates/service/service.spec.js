import {<%= camelCaseName %>} from './<%= dottedName %>';
// TODO: Remove import if uiRouter not needed
import uiRouter from 'angular-ui-router';

// To enable it to be tested completely independently
const <%= camelCaseName %>Service = angular
  // TODO: Remove dependency if uiRouter not needed
  .module('<%= titleCaseName %>Service', [uiRouter])
  .factory('<%= titleCaseName %>', <%= camelCaseName %>);

describe('<%= titleCaseName %>Service', () => {
  let <%= titleCaseName %>;
  let $httpBackend;
  let apiRequest;
  let apiResponse;

  const exampleName = exampleName;

  beforeEach(window.module(<%= camelCaseName %>Service.name));

  beforeEach(inject((_<%= titleCaseName %>_, _$httpBackend_) => {
    <%= titleCaseName %> = _<%= titleCaseName %>_;
    $httpBackend = _$httpBackend_;
  }));

  describe('#addTo<%= titleCaseName %>()', () => {
    it('adds to array of <%= camelCaseName %>', () => {
      <%= titleCaseName %>.addTo<%= titleCaseName %>(exampleName);
      expect(<%= titleCaseName %>.getAll<%= titleCaseName %>()[0].name).to.eql(exampleName);
    });
  });

  describe('#getAll<%= titleCaseName %>()', () => {
    it('returns an array of <%= camelCaseName %>', () => {
      expect(<%= titleCaseName %>.getAll<%= titleCaseName %>()).to.be.an('array');
    });
  });

  describe('#loadAll<%= titleCaseName %>()', () => {
    beforeEach(inject(() => {
      apiRequest = $httpBackend.whenGET('/api/<%= spineCaseName %>');
      apiResponse = [{ name: exampleName }];
      apiRequest.respond(apiResponse);

      <%= titleCaseName %>.loadAll<%= titleCaseName %>();
      $httpBackend.flush();
    }));

    it('loads an array of <%= camelCaseName %>', () => {
      expect(<%= titleCaseName %>.getAll<%= titleCaseName %>()).to.not.be.undefined;
      expect(<%= titleCaseName %>.getAll<%= titleCaseName %>().length).to.eql(1);
      expect(<%= titleCaseName %>.getAll<%= titleCaseName %>()[0].name).to.eql(exampleName);
    });
  });
});
