import merge from 'lodash/merge';
import {
  NotFoundError, AlreadyInUseError, ValidationError
} from 'common-errors';
import User from './model';

import { VALID_OBJECT_ID } from '../../../util/constants';

/* ********************
 *  HELPER FUNCTIONS *
 * ********************/

const isExistingUser = ({ email }) => (
  User.findOne({ email })
    .exec()
    .then((existingUser) => {
      if (existingUser) {
        throw new AlreadyInUseError('User', 'email');
      }

      return null;
    })
);

/* *********************
 * EXPORTED FUNCTIONS *
 * *********************/

/**
 * Params middleware for any route with /user/:userId
 * sets req.user
 */
const params = (req, res, next, userId) => {
  if (userId.match(VALID_OBJECT_ID)) {
    User.findById(userId)
      .exec()
      .then((user) => {
        if (!user) {
          throw new NotFoundError('User not found');
        } else {
          req.user = user;
          next();
        }
      })
      .catch(err => next(err));
  } else {
    next(
      new ValidationError(
        'charityId must be valid ObjectId',
        VALID_OBJECT_ID,
        'charityId'
      )
    );
  }
};

/**
 * Returns all users
 */
const all = (req, res, next) => {
  User.find({})
    .exec()
    .then(users => res.json(users))
    .catch(err => next(err));
};

/**
 * Returns req.user
 */
const get = (req, res) => res.json(req.user);

/**
 * Updates user
 */
const update = (req, res, next) => {
  isExistingUser(req.body)
    .then(() => merge(req.user, req.body))
    .then(user => user.save())
    .then(savedUser => res.json(savedUser))
    .catch(err => next(err));
};

/**
 * Creates new user
 */
const create = (req, res, next) => {
    isExistingUser(req.body)
      .then(() => new User(req.body).save())
      .then((user) => {
        return res.json(user);
      })
      .catch(err => next(err));
};

/**
 * Deletes user
 */
const destroy = (req, res, next) => (
  req.user.remove()
    .then(removed => res.json(removed))
    .catch(err => next(err))
);

export default {
  params, all, get, update, create, destroy
};
