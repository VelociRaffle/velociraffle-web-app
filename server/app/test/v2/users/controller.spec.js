import { expect } from 'chai';
import request from 'supertest-as-promised';
import app from '../../../index';
import '../../util';

describe('User routes', function userRoutes() {
  describe('#signup', function signUp() {
    const signup = '/api/v1/users';
    const user = {
      email: 'test@test.com',
      password: 'password',
      firstName: 'John',
      lastName: 'Doe'
    };

    it('sends a token with valid user', function createUser() {
      return request(app)
        .post(signup)
        .send(user)
        .expect(200)
        .then(function onResponse(res) {
          expect(res.body).to.have.property('token');
        })
        .catch(function onError(err) {
          console.log('Error:', err);
        });
    });

    it('responds with 400 if email invalid', function invalidEmail() {
      return request(app)
        .post(signup)
        .send({
          ...user,
          email: 'test',
        })
        .expect(400)
        .then(function onResponse(res) {
          expect(res.error.text).to.equal('user validation failed');
        });
    });

    it('responds with 400 if password invalid', function invalidPassword() {
      return request(app)
        .post(signup)
        .send({
          ...user,
          password: 'short'
        })
        .expect(400)
        .then(function onResponse(res) {
          expect(res.error.text).to.equal('user validation failed');
        });
    });

    it('responds with 400 without firstName', function noFirstName() {
      return request(app)
        .post(signup)
        .send({
          ...user,
          firstName: ''
        })
        .expect(400)
        .then(function onResponse(res) {
          expect(res.error.text).to.equal('user validation failed');
        });
    });

    it('responds with 400 without lastName', function noLastName() {
      return request(app)
        .post(signup)
        .send({
          ...user,
          lastName: ''
        })
        .expect(400)
        .then(function onResponse(res) {
          expect(res.error.text).to.equal('user validation failed');
        });
    });

    it('sends 409 status if user already exists', function alreadyExists() {
      return request(app)
        .post(signup)
        .send(user)
        .then(function onUserCreate() {
          return request(app)
            .post(signup)
            .send(user)
            .expect(409);
        });
    });
  });
});
