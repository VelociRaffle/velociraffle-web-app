import { Router } from 'express';
import Raffles from './controller';

const raffleRouter = Router({ mergeParams: true });

raffleRouter.param('raffleId', Raffles.params);

raffleRouter.route('/')
  .get(Raffles.all)
  .post(Raffles.create);

raffleRouter.route('/:raffleId')
  .get(Raffles.get)
  .put(Raffles.update);

raffleRouter.post('/:raffleId/purchase', Raffles.purchase);
raffleRouter.post('/:raffleId/winner', Raffles.drawWinner);

export default raffleRouter;
