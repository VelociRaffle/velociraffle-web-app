import { Router } from 'express';
import Charities from './controller';
import RaffleRoutes from './raffle/routes';

const charityRouter = Router();

charityRouter.use('/:charityId/raffles', RaffleRoutes);

charityRouter.param('charityId', Charities.params);

charityRouter.route('/')
  .get(Charities.all)
  .post(Charities.create);

charityRouter.route('/:charityId')
  .get(Charities.get)
  .put(Charities.update)
  .delete(Charities.destroy);

export default charityRouter;
