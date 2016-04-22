import mongoose from 'mongoose';
import validate from 'mongoose-validator';
import Promise from 'bluebird';

// Remove warning log from Bluebird due to Mongoose promises
Promise.config({
  warnings: false
});

// Set mongoose promises to use Bluebird promise library
mongoose.Promise = Promise;

const validEmail = validate({
  validator: 'isEmail',
  httpStatus: 400
});

const User = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: validEmail
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  raffles: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Raffle'
  }]
});

User.virtual('fullName').get(function getFullName() {
  return `${this.firstName} ${this.lastName}`;
});

User.virtual('fullName').set(function setFullName(fullName) {
  const names = fullName.split(' ');
  this.firstName = names[0];
  this.lastName = names[1];
});

User.set('toObject', { getters: true });
User.set('toJSON', {
  getters: true,
  virtuals: true
});

User.methods = {
  toJSON() {
    const user = this.toObject();
    delete user.id;
    return user;
  }
}

export default mongoose.model('User', User);
