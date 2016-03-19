import findIndex from 'lodash/findIndex';
import merge from 'lodash/merge';
import { NotFoundError, NotPermittedError, ValidationError } from 'common-errors';
import Charity from '../model';
import Raffle from './model';
import User from '../../user/model';

import { VALID_OBJECT_ID } from '../../../../util/validations';


/* *********************
 * EXPORTED FUNCTIONS *
 * *********************/

/**
 * Params middleware for any route with /raffle/:id
 * sets req.raffle
 */
const params = (req, res, next, id) => {
  Raffle.findById(id)
    .select('-charity')
    .populate('winner', 'email firstName lastName')
    .exec()
    .then((raffle) => {
      if (!raffle) {
        throw new NotFoundError('Raffle not found');
      } else {
        req.raffle = raffle;
        next();
      }
    })
    .catch(err => next(err));
};

/**
 * Returns all raffles
 * takes optional query isActive=true
 */
const all = (req, res, next) => {
  if (req.query.hasOwnProperty('isActive') && req.query.isActive === 'true') {
    return Raffle.find({ isActive: true })
      .select('-charity')
      .populate('winner', 'email firstName lastName')
      .exec()
      .then(raffles => res.json(raffles))
      .catch(err => next(err));
  }
  return Charity
    .populate(req.charity, {
      path: 'raffles',
      select: '-charity'
    })
    .then(({ raffles }) => {
      return Raffle.populate(raffles, {
        path: 'winner'
      });
    })
    .then(raffles => res.json(raffles))
    .catch(err => next(err));
};

/**
 * Returns req.raffle
 */
const get = (req, res) => res.json(req.raffle);

/**
 * Creates new raffle
 */
const create = (req, res, next) => {
  return new Raffle({
    charity: req.charity._id,
    prize: {
      name: req.body.prizeName,
      thumbnailURL: req.body.prizeThumbnailURL
    }
  }).save()
  .then((savedRaffle) => {
    req.charity.raffles.push(savedRaffle);
    req.charity.save();
    savedRaffle = savedRaffle.toObject();
    return res.json(savedRaffle);
  })
  .catch(err => next(err));
};

/**
 * Purchase raffle
 * if existing user use query userId={userId}
 * if new user user email, firstName, lastName in req.body
 */

const purchase = (req, res, next) => {
  const hasUserId = req.query.hasOwnProperty('userId');
  if (req.raffle.isActive) {
    const findOrCreateUser = hasUserId
      ? findByUserId
      : createUser;

    findOrCreateUser()
      .then(addTickets)
        .all()
      .then(([raffle, user]) => {
        const buyer = raffle.purchases.filter(
          purchase => purchase.buyer === user._id
        )[0];
        return res.json({
          count: buyer.count,
          user: {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
          }
        });
      })
      .catch(err => next(err));
  } else {
    next(new NotPermittedError(
      'Tickets cannot be purchased after raffle has ended.'
    ));
  }

  function findByUserId() {
    const userId = req.query.userId;

    if (!userId.match(VALID_OBJECT_ID)) {
      return next(
        new ValidationError(
          'charityId must be valid ObjectId',
          VALID_OBJECT_ID,
          'charityId'
        )
      );
    }
    return User.findById(userId)
      .then((user) => {
        if (!user) {
          throw new NotFoundError('User not found');
        } else {
          return user;
        }
      });
  }

  function createUser() {
    return new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    }).save();
  }

  function addTickets(user) {
    // checks for if user already purchased raffles
    const purchaseIndex = findIndex(req.raffle.purchases, ['buyer', user._id]);
    const userRafflesIndex = findIndex(user.raffles, req.raffle._id);

    if (purchaseIndex > -1) {
      // remove duplicate purchase from purchases array
      // this is a workaround to an Mongoose error I was receiving
      // See: https://github.com/Automattic/mongoose/issues/3816
      const dupPurchase = req.raffle.purchases.splice(purchaseIndex, 1)[0];
      req.raffle.purchases.push({
        count: dupPurchase.count + Number(req.body.count),
        buyer: user._id
      });
    } else {
      req.raffle.purchases.push({
        count: Number(req.body.count),
        buyer: user._id
      });
    }
    if (userRafflesIndex > -1) {
      return [req.raffle.save(), user];
    } else {
      user.raffles.push(req.raffle);
      return [req.raffle.save(), user.save()];
    }
  }
};

/**
 * Draw winner
 */
const drawWinner = (req, res, next) => {
  if (!req.raffle.winner && req.raffle.isActive) {
    const winner = req.raffle.drawWinningTicket();
    return merge(req.raffle, { winner })
      .save()
      .then(
        (savedRaffle) => (
          Raffle.populate(savedRaffle, {
            path: 'winner'
          })
        )
      )
      .then(({ winner }) => res.json(winner))
      .catch(err => next(err));
  } else {
    next(new NotPermittedError(
      'Winner has already been chosen or raffle has ended.'
    ));
  }
};

/**
 * Update Raffle
 * To end raffle use isActive=false
 */
const update = (req, res, next) => {
  return merge(req.raffle, req.body).save()
    .then(savedRaffle => res.json(savedRaffle))
    .catch(err => next(err));
};

export default {
  params, all, get, create, purchase, drawWinner, update
};
