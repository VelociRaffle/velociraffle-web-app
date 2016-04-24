import bookshelf from '../../../config/bookshelf.config';
import Raffle from './raffle';
import Ticket from './ticket';

const Prize = bookshelf.Model.extend({
  tableName: 'prizes',
  raffle() {
    return this.belongsTo(Raffle);
  },
  winningTicket() {
    return this.belongsTo(Ticket, 'winning_ticket_id');
  },
  tickets() {
    return this.hasMany(Ticket);
  }
});

export default Prize;