import bookshelf from '../../../config/bookshelf.config';
import Charity from './charity';
import Prize from './prize';

const Raffle = bookshelf.Model.extend({
  tableName: 'raffles',
  charity() {
    return this.belongsTo(Charity);
  },
  prizes() {
    return this.hasMany(Prize);
  }
});

export default Raffle;