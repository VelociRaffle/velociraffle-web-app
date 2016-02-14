import logo from '../../../images/logo.png';

class WelcomeController {
  constructor() {
    this.logo = logo;

    this._activate();
  }

  _activate() {
  }
}

WelcomeController.$inject = [];

export {WelcomeController};
