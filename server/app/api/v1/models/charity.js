import bookshelf from '../../../config/bookshelf.config';
import Raffle from './raffle';

const Charity = bookshelf.Model.extend({
  tableName: 'charities',
  raffles() {
    return this.hasMany(Raffle);
  }
});

export default Charity;