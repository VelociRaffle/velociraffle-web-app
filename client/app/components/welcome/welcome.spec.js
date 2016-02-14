/* jscs:disable */
import {welcome} from './welcome';
import {WelcomeController as Controller} from './welcome.controller';
import {welcomeDirective as Directive} from './welcome.directive';
import template from './welcome.html';
/* jscs:enable */

describe('Welcome', () => {
  let $rootScope;
  let makeController;

  beforeEach(window.module(welcome.name));

  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;

    makeController = () => {
      return new Controller();
    };
  }));

  const vmProperties = [
    { name: 'logo' }
  ];

  describe('Module', () => {
    it('has an appropriate name', () => {
      expect(welcome.name).to.equal('welcome');
    });
  });


  describe('Controller', () => {
    let controller;

    beforeEach(() => {
      controller = makeController();
    });

    it('exists', () => {
      expect(!!controller).to.be.true;
    });

    describe('initialization', () => {
      describe('vm properties', () => {
        it('all required exist', () => {
          vmProperties.forEach((prop) => {
            expect(controller[prop.name]).to.not.be.undefined;
          });
        });

        it('all have correct types', () => {
          vmProperties.forEach((prop) => {
            if (prop.type) {
              expect(controller[prop.name]).to.be.a(prop.type);
            }
          });
        });
      });
    });
  });


  describe('Template', () => {
    describe('vm properties', () => {
      it('all required exist', () => {
        vmProperties.forEach((prop) => {
          if (prop.name.charAt(0) !== '_') {
            expect(template.includes(`vm.${prop.name}`)).to.be.true;
          }
        });
      });
    });
  });


  describe('Directive', () => {
    let directive = Directive();

    it('uses the right template', () => {
      expect(directive.template).to.equal(template);
    });

    it('uses controllerAs', () => {
      expect(directive).to.have.property('controllerAs');
    });

    it('uses the right controller', () => {
      expect(directive.controller).to.equal(Controller);
    });

    it('has an isolate scope', () => {
      expect(directive.scope).to.be.an('object');
    });
  });
});
