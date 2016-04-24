import bookshelf from '../../../config/bookshelf.config';
import Ticket from './ticket';

const User = bookshelf.Model.extend({
  tableName: 'users',

  initialize() {
    this.on('saving',
      () => this.attributes.email.toLowerCase()
    );
  },

  tickets() {
    return this.hasMany(Ticket);
  }
});

export default User;
