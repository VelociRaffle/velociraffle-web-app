import { Router } from 'express';
import Raffles from '../../controllers/raffles';

const raffleRouter = Router({ mergeParams: true });

raffleRouter.param('raffleId', Raffles.params);

raffleRouter.route('/')
  .post(Raffles.create);

raffleRouter.route('/:raffleId')
  .get(Raffles.get)
  .put(Raffles.update)
  .delete(Raffles.destroy);

// TODO: Could potentially be separated out into sub-routes.
raffleRouter.get('/:raffleId/prizes/:prizeId', Raffles.prize);
raffleRouter.post('/:raffleId/prizes/:prizeId/purchase', Raffles.purchase);
raffleRouter.put('/:raffleId/prizes/:prizeId/winner', Raffles.drawWinner);

export default raffleRouter;
