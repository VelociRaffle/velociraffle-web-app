class <%= titleCaseName %>Controller {
  constructor() {
    this.greeting = '<%= titleCaseName %>Controller!';

    this._activate();
  }

  _activate() {
  }
}

<%= titleCaseName %>Controller.$inject = [];

export {<%= titleCaseName %>Controller};
