import {
  NotFoundError, AlreadyInUseError
} from 'common-errors';
import User from '../models/user';

/**
 * Checks if created/updated user email already exists
 * @param email
 * @private
 */
const _isExistingUser = ({ email }) => (
  User
    .where('email', email)
    .fetch()
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
 * Sets charity for any users/:userId route to req.user
 * @param req
 * @param res
 * @param next
 * @param userId
 */
const params = (req, res, next, userId) => {
  Charity
    .where('id', userId)
    .fetch({ withRelated: 'tickets' })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User not found');
      } else {
        req.user = user;
        next();
      }
    })
    .catch(err => next(err));
};

/**
 * Returns req.user as JSON
 * @param req
 * @param res
 */
const get = (req, res) => res.json({ user: req.user });

/**
 * Returns all users
 * @param req
 * @param res
 * @param next
 */
const all = (req, res, next) => {
  User
    .fetchAll({ withRelated: 'tickets' })
    .then(users => res.json({ users }))
    .catch(err => next(err));
};

/**
 * Updates user
 * @param req
 * @param res
 * @param next
 */
const update = (req, res, next) => {
  _isExistingUser(req.body)
    .then(() => (
        new User(req.user)
          .save(req.body, { patch: true })
      )
    )
    .then(user => res.json({ user }))
    .catch(err => next(err))
};

/**
 * Creates user
 * @param req
 * @param res
 * @param next
 */
const create = (req, res, next) => {
  _isExistingUser(req.body)
    .then(() => new User(req.body).save())
    .then(user => res.json({ user }))
    .catch(err => next(err));
};

/**
 * Deletes user
 * @param req
 * @param res
 * @param next
 */
const destroy = (req, res, next) => (
  new User(req.user)
    .destroy()
    .then(user => res.json({ user }))
    .catch(err => next(err))
);

export default {
  params, get, all,
  update, create, destroy
};
