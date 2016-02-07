import {<%= camelCaseName %>} from './<%= dottedName %>';
import {<%= titleCaseName %>Controller} from './<%= dottedName %>.controller';
import {<%= camelCaseName %>Directive} from './<%= dottedName %>.directive';
import template from './<%= dottedName %>.html';

describe('<%= titleCaseName %>', () => {
  let $rootScope;
  let makeController;

  // // TODO: Remove comments if not injecting a service
  // // TODO: Remove from ./<%= dottedName %>.js if not using
  // // EXAMPLE 1: Injecting Users
  // // 1.A. Define variable
  // let Users;

  beforeEach(window.module(<%= camelCaseName %>.name));

  // 1.B. Inject Users. Make sure to include it when instantiating the controller
  // beforeEach(inject((_$rootScope_, _Users_)=>{
  //   $rootScope = _$rootScope_;
  //   Users = _Users_;

  //   makeController = () => {
  //     return new NavbarController(Users);
  //   };
  // }));

  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;

    makeController = () => {
      return new <%= titleCaseName %>Controller();
    };
  }));

  const vmProperties = [
    { name: 'greeting', type: 'string' }
  ];

  describe('Module', () => {
    it('has an appropriate name', () => {
      expect(<%= camelCaseName %>.name).to.equal('<%= camelCaseName %>');
    });

    // TODO: [GP] Add test templates to see if it registers certain
    // modules/factories/etc
    // TODO: [GP] Add test templates for correct routing
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

      describe('#_activate()', () => {
        it('calls other functions [REMOVE IF NOTHING IN #_activate()]');

        // // 1.C. Create a spy, test if it's called in #activate()
        // it('loads the currentUser', () => {
        //   sinon.spy(Users, 'getCurrent')
        //   makeController();
        //   expect(Users.getCurrent.called).to.be.true
        // });
      });
    });

    describe('functions', () => {
      // NOTE: Do NOT test private methods.
      // NOTE: Private methods start with an underscore.

      describe('#myPublicFunction()', () => {
        it('tests public functions [REMOVE IF NO PUBLIC FUNCS BOUND TO VM]');
      });

      // // 1.D. Create a spy, test if it's called by functions in the controller
      // describe('#updateCurrentUser()', () => {
      //   it('updates the user', () => {
      //     sinon.spy(Users, 'updateUserById')
      //     controller.updateCurrentUser();
      //     expect(Users.updateUserById.called).to.be.true
      //   });
      // });
    });
  });


  describe('Template', () => {
    describe('vm properties', () => {
      it('all required exist', () => {
        vmProperties.forEach((prop) => {
          if (prop.name.charAt(0) !== '_') {
            expect(template.includes(<%= vmPropName %>)).to.be.true;
          }
        });
      });
    });
  });


  describe('Directive', () => {
    let directive = <%= camelCaseName %>Directive();

    it('uses the right template', () => {
      expect(directive.template).to.equal(template);
    });

    it('uses controllerAs', () => {
      expect(directive).to.have.property('controllerAs');
    });

    it('uses the right controller', () => {
      expect(directive.controller).to.equal(<%= titleCaseName %>Controller);
    });

    it('has an isolate scope', () => {
      expect(directive.scope).to.be.an('object');
    });
  });
});
