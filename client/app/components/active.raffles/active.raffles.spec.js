/* jscs:disable */
import {activeRaffles} from './active.raffles';
import {ActiveRafflesController as Controller} from './active.raffles.controller';
import {activeRafflesDirective as Directive} from './active.raffles.directive';
import template from './active.raffles.html';
/* jscs:enable */

describe('ActiveRaffles', () => {
  let makeController;

  beforeEach(window.module(activeRaffles.name));

  beforeEach(inject(() => {
    makeController = () => {
      return new Controller();
    };
  }));

  const vmProperties = [
    { name: 'raffles', type: 'array' }
  ];

  describe('Module', () => {
    it('has an appropriate name', () => {
      expect(activeRaffles.name).to.equal('activeRaffles');
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

    describe('functions', () => {
      describe('#myPublicFunction()', () => {
        it('tests public functions [REMOVE IF NO PUBLIC FUNCS BOUND TO VM]');
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
