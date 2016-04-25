import { Router } from 'express';
import Charities from '../../controllers/charities';
import raffleRouter from './raffles';

const charityRouter = Router();

charityRouter.use('/:charityId/raffles', raffleRouter);

charityRouter.param('charityId', Charities.params);

charityRouter.route('/')
  .get(Charities.all)
  .post(Charities.create);

charityRouter.route('/:charityId')
  .get(Charities.get)
  .put(Charities.update)
  .delete(Charities.destroy);

export default charityRouter;
