import mongoose from 'mongoose';
import validate from 'mongoose-validator';
import Promise, { promisify } from 'bluebird';
import bcrypt from 'bcrypt';

// Remove warning log from Bluebird due to Mongoose promises
Promise.config({
  warnings: false
});

// Set mongoose promises to use Bluebird promise library
mongoose.Promise = Promise;

const compare = promisify(bcrypt.compare);
const hash = promisify(bcrypt.hash);
const genSalt = promisify(bcrypt.genSalt);

const validEmail = validate({
  validator: 'isEmail',
  httpStatus: 400
});

const validLength = validate({
  validator: 'isLength',
  arguments: [6],
  httpStatus: 400,
});

const User = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: validEmail
  },
  password: {
    type: String,
    required: true,
    validate: validLength,
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  }
});

User.virtual('fullName').get(function getFullName() {
  return `${this.firstName} ${this.lastName}`;
});

User.virtual('fullName').set(function setFullName(fullName) {
  const names = fullName.split(' ');
  this.firstName = names[0];
  this.lastName = names[1];
});

User.set('toObject', {
  getters: true,
});

User.set('toJSON', {
  getters: true,
  virtuals: true
});

User.pre('save', function onUserSave(next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.encryptPassword(this.password)
    .then((password) => {
      this.password = password;
      next();
    });
});

User.methods = {
  authenticate(unhashedPassword) {
    return compare(unhashedPassword, this.password);
  },

  encryptPassword(unhashedPassword) {
    if (!unhashedPassword) {
      return '';
    }

    return genSalt(10)
      .then(salt => hash(unhashedPassword, salt));
  },

  toJSON() {
    const user = this.toObject();
    delete user.password;
    return user;
  }
};

export default mongoose.model('User', User);
