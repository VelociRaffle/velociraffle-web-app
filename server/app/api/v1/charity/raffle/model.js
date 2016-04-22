import mongoose from 'mongoose';
import validate from 'mongoose-validator';
import Promise from 'bluebird';
import flatten from 'lodash/flatten';
import times from 'lodash/times';
import sample from 'lodash/sample';

// Remove warning log from Bluebird due to Mongoose promises
Promise.config({
  warnings: false
});

// Set mongoose promises to use Bluebird promise library
mongoose.Promise = Promise;

const validURL = validate({
  validator: 'isURL',
  httpStatus: 400
});

const Raffle = new mongoose.Schema({
  charity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Charity'
  },
  prize: {
    name: String,
    thumbnailURL: {
      type: String,
      validate: validURL
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  purchases: [{
    count: Number,
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

Raffle.methods = {
  drawWinningTicket() {
    const { purchases } = this;
    return sample(
      flatten(
        purchases.map(
          (purchase) => times(purchase.count, () => purchase.buyer)
        )
      )
    );
  }
};

export default mongoose.model('Raffle', Raffle);
