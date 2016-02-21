import { Router } from 'express';
import Users from './controller';
import { decodeToken, currentUser, verifyUser } from '../../../auth';

const router = Router();
const checkUser = [decodeToken, currentUser];

router.param('id', Users.params);

router.get('/me', checkUser, Users.get);

router.post('/login', verifyUser, Users.login);

router.route('/')
  .get(Users.all)
  .post(Users.create);

router.route('/:id')
  .get(Users.get)
  .put(Users.update)
  .delete(Users.destroy);

export default router;
