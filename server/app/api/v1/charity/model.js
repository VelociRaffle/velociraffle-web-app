import mongoose from 'mongoose';
import validate from 'mongoose-validator';
import Promise from 'bluebird';

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

const Charity = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  description: String,
  url: {
    type: String,
    validate: validURL
  },
  raffles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Raffle'
  }]
});

export default mongoose.model('Charity', Charity);
