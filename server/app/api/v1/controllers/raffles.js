import {
  NotFoundError
} from 'common-errors';
import uuid from 'node-uuid';
import times from 'lodash/times';
import sample from 'lodash/sample';
import Raffle from '../models/raffle';
import Prize from '../models/prize';
import Ticket from '../models/ticket';
import User from '../models/user';

const _getPrize = (req) => (
  Prize
    .where('id', req.params.prizeId)
    .fetch({
      withRelated: 'winningTicket'
    })
    .then((prize) => {
      if (!prize) {
        throw new NotFoundError('Prize not found');
      }
      return prize;
    })
);

/**
 * Sets raffle for any charities/:charityId/raffles/:raffleId route to req.raffle
 * @param  req
 * @param  res
 * @param  next
 * @param  raffleId
 */
const params = (req, res, next, raffleId) => {
  Raffle
    .where({
      id: raffleId,
      charity_id: req.params.charityId
    })
    .fetch({ withRelated: 'prizes'})
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
 * Returns req.raffle as JSON
 * @param  req
 * @param  res
 */
const get = (req, res) => {
  res.json({ raffle: req.raffle });
}

/**
 * Updates raffle, use req.body.expiration_date
 * @param req
 * @param res
 * @param next
 */
const update = (req, res, next) => (
  new Raffle(req.raffle)
    .save(req.body, { patch: true })
    .then(raffle => res.json({ raffle }))
    .catch(err => next(err))
);

/**
 * Creates raffle
 * @param req
 * @param res
 * @param next
 */
const create = (req, res, next) => {
  const charity_id = req.params.charityId;
  const expiration_date = req.body.expiration_date;

  return new Raffle({
    charity_id,
    expiration_date
  }).save()
    .then(raffle => res.json({ raffle }))
    .catch(err => next(err));
};

/**
 * Deletes raffle
 * @param req
 * @param res
 * @param next
 */
const destroy = (req, res, next) => (
  new Raffle(req.raffle)
    .destroy()
    .then(raffle => res.json({ raffle }))
    .catch(err => next(err))
);

/**
 * Sends prize as JSON
 * @param req
 * @param res
 * @param next
 */
const prize = (req, res, next) => (
  _getPrize(req)
    .then(prize => res.json({ prize }))
    .catch(err => next(err))
);

/**
 * Purchases tickets for user
 * Can take user_id for exisiting user, or create user dynamically
 * with req.body (align with user model)
 * req.body should have either:
 *  {
 *  	first_name: '',
 *  	last_name: '',
 *  	email: '',
 *  	number_of_tickets: ''
 *  } or
 *  {
 *  	user_id: '',
 *  	number_of_tickets: ''
 *  }
 * @param req
 * @param res
 * @param next
 */
const purchase = (req, res, next) => {
  const _isExistingUser = () => (
    new Promise(function existingUser(resolve, reject) {
      if (req.body.hasOwnProperty('user_id')) {
        return User
          .where('id', req.body.user_id)
          .fetch({})
          .then((user) => {
            if (!user) {
              reject(new NotFoundError('No user with that id was found.'));
            }
            resolve(true);
          });
      }
      resolve(false);
    })
  );

  const _createUser = (existingUser) => {
    if (!existingUser) {
      return new User({
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name
      }).save();
    }
    return false;
  }

  const _generateTicketNumbers = (num) => times(num, () => uuid.v4());

  return _isExistingUser()
    .then(_createUser)
    .then((user) => {
      const user_id = user ? user.id : req.body.user_id;
      const ticketNumbers = _generateTicketNumbers(req.body.number_of_tickets);

      return Promise.all(
        ticketNumbers.map(
          (number) => {
            return new Ticket({
              prize_id: req.params.prizeId,
              user_id,
              number
            }).save()
          }
        )
      );
    })
    .then(tickets => res.json({ tickets }))
    .catch(err => next(err));
};

const drawWinner = (req, res, next) => {
  Ticket
    .query('where', 'prize_id', req.params.prizeId)
    .fetchAll()
    .then((tickets) => {
      const winningTicket = sample(tickets.toJSON());
      const prize = new Prize({
        id: req.params.prizeId
      })
      .save({
        winning_ticket_id: winningTicket.id
      }, {
        patch: true
      });
      return [winningTicket, prize]
    }).all()
    .then(
      ([winningTicket, prize]) => (
        res.json({
          winner: {
            number: winningTicket.number,
            user_id: winningTicket.user_id,
            prize_id: prize.id
          }
        })
      )
    )
    .catch(err => next(err));
};

export default {
  params, get, create, update,
  destroy, prize, purchase, drawWinner
};
