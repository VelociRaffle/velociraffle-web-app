import {
  NotFoundError, AlreadyInUseError, ValidationError
} from 'common-errors';
import merge from 'lodash/merge';
import Charity from './model';

import { VALID_OBJECT_ID } from '../../../util/constants';

/* ********************
 *  HELPER FUNCTIONS *
 * ********************/

const _isExistingCharity = ({ name }) => (
  Charity.findOne({ name })
    .exec()
    .then((exisitingCharity) => {
      if (exisitingCharity) {
        throw new AlreadyInUseError('Charity', 'name');
      }
      return null;
    })
);

/* *********************
 * EXPORTED FUNCTIONS *
 * *********************/

 /**
  * Params middleware for any route with /charities/:charityId
  * sets req.charity
  */
const params = (req, res, next, charityId) => {
  if (charityId.match(VALID_OBJECT_ID)) {
    Charity.findById(charityId)
      .then((charity) => {
        if (!charity) {
          throw new NotFoundError('Charity not found');
        } else {
          req.charity = charity;
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
 * Returns all charities
 */
const all = (req, res, next) => {
  Charity.find({})
    .select('-raffles')
    .exec()
    .then(charities => res.json(charities))
    .catch(err => next(err));
};

/**
 * Returns req.charity
 */
const get = (req, res) => res.json(req.charity);

/**
 * Updates charity
 */
const update = (req, res, next) => {
  _isExistingCharity(req.body)
    .then(() => merge(req.charity, req.body))
    .then(charity => charity.save())
    .then(savedCharity => {
      return res.json(savedCharity);
    })
    .catch(err => next(err));
};

/**
 * Creates new charity
 */
const create = (req, res, next) => {
    _isExistingCharity(req.body)
      .then(() => new Charity(req.body).save())
      .then((charity) => {
        charity.populate('raffles');
        return res.json(charity);
      })
      .catch(err => next(err));
};

/**
 * Deletes charity
 */
const destroy = (req, res, next) => (
  req.charity.remove()
    .then(removed => res.json(removed))
    .catch(err => next(err))
);

export default {
  params, all, get, update, create, destroy
};
