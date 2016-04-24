import {
  NotFoundError, AlreadyInUseError
} from 'common-errors';
import Charity from '../models/charity';

/**
 * Checks is query string `isActive` is present and equals `true`
 * Filters active raffles by expiration_date
 * @param req
 * @param qb
 * @private
 */
const _isActiveRaffle = (req, qb) => {
  const today = new Date().toISOString();

  if (req.query.hasOwnProperty('isActive') && req.query.isActive === 'true') {
    qb.where('expiration_date', '>=', today);
  }
};

/**
 * Checks if created/updated charity name already exists
 * @param name
 * @private
 */
const _isExistingCharity = ({ name }) => (
  Charity
    .where('name', name)
    .fetch()
    .then((existingCharity) => {
      if (existingCharity) {
        throw new AlreadyInUseError('Charity', 'name');
      }
      return null;
    })
);

/* ********************
 * EXPORTED FUNCTIONS *
 * ********************/

/**
 * Sets charity for any charities/:charityId route to req.charity
 * @param req
 * @param res
 * @param next
 * @param charityId
 */
const params = (req, res, next, charityId) => {
  Charity
    .where('id', charityId)
    .fetch({
      withRelated: ['raffles.prizes', {
        raffles(qb) {
          _isActiveRaffle(req, qb);
        }
      }]
    })
    .then((charity) => {
      if (!charity) {
        throw new NotFoundError('Charity not found');
      } else {
        req.charity = charity;
        next();
      }
    })
    .catch(err => next(err));
};

/**
 * Returns req.charity as JSON
 * @param req
 * @param res
 */
const get = (req, res) => res.json({ charity: req.charity });

/**
 * Returns all charities
 * @param req
 * @param res
 * @param next
 */
const all = (req, res, next) => {
  Charity
    .fetchAll({
      withRelated: ['raffles.prizes', {
        raffles(qb) {
          _isActiveRaffle(req, qb);
        }
      }]
    })
    .then(charities => res.json({ charities }))
    .catch(err => next(err));
};

/**
 * Updates charity
 * @param req
 * @param res
 * @param next
 */
const update = (req, res, next) => {
  _isExistingCharity(req.body)
    .then(() => (
        new Charity(req.charity)
          .save(req.body, { patch: true })
      )
    )
    .then(charity => res.json({ charity }))
    .catch(err => next(err))
};

/**
 * Creates charity
 * @param req
 * @param res
 * @param next
 */
const create = (req, res, next) => {
  _isExistingCharity(req.body)
    .then(() => new Charity(req.body).save())
    .then(charity => res.json({ charity }))
    .catch(err => next(err));
};

/**
 * Deletes charity
 * @param req
 * @param res
 * @param next
 */
const destroy = (req, res, next) => (
  new Charity(req.charity)
    .destroy()
    .then(charity => res.json({ charity }))
    .catch(err => next(err))
);

export default {
  params, get, all,
  update, create, destroy
};
