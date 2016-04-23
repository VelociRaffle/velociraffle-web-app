import { Router } from 'express';
import Users from '../controllers/users';

const userRouter = Router();

userRouter.param('userId', Users.params);

userRouter.route('/')
  .get(Users.all)
  .post(Users.create);

userRouter.route('/:userId')
  .get(Users.get)
  .put(Users.update)
  .delete(Users.destroy);

export default userRouter;