import jwt from 'jsonwebtoken';
import expressJWT from 'express-jwt';
import {
  HttpStatusError, ArgumentNullError, NotFoundError
} from 'common-errors';
import config from '../config';
import User from '../api/v1/user/model';

const checkToken = expressJWT({ secret: config.secrets.jwt });

export function decodeToken(req, res, next) {
  if (req.query && req.query.hasOwnProperty('token')) {
    req.header.authorization = 'Bearer ' + req.query.token;
  }

  checkToken(req, res, next);
}

export function currentUser(req, res, next) {
  User.findById(req.user._id)
    .exec()
    .then((user) => {
      if (!user) {
        throw new HttpStatusError(401, 'Unauthorized');
      } else {
        req.user = user;
        next();
      }
    })
    .catch(err => next(err));
}

export function verifyUser(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    next(new ArgumentNullError('You need an email and password'));
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('No user with that email');
      } else {
        return [user, user.authenticate(password)];
      }
    }).all()
    .then(([user, authenticated]) => {
      if (authenticated) {
        req.user = user;
        next();
      } else {
        throw new HttpStatusError(400, 'Password is incorrect');
      }
    })
    .catch(err => next(err));
}

export const signToken = id => (
  jwt.sign(
    { _id: id },
    config.secrets.jwt,
    { expiresIn: config.expireTime }
  )
);
