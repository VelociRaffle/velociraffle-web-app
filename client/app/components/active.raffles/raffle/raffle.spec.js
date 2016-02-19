/* jscs:disable */
import {raffle} from './raffle';
import {RaffleController as Controller} from './raffle.controller';
import {raffleDirective as Directive} from './raffle.directive';
import template from './raffle.html';
/* jscs:enable */

describe('Raffle', () => {
  let makeController;

  beforeEach(window.module(raffle.name));

  beforeEach(inject(() => {
    makeController = () => {
      return new Controller();
    };
  }));

  const vmProperties = [
  ];

  describe('Module', () => {
    it('has an appropriate name', () => {
      expect(raffle.name).to.equal('raffle');
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
