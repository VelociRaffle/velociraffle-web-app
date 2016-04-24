import bookshelf from '../../../config/bookshelf.config';
import User from './user';
import Prize from './prize';

const Ticket = bookshelf.Model.extend({
  tableName: 'tickets',
  user() {
    return this.belongsTo(User);
  },
  prize() {
    return this.belongsTo(Prize);
  }
});

export default Ticket;