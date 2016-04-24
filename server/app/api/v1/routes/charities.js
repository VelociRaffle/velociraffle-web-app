import { Router } from 'express';
import Charities from '../controllers/charities.js';

const charityRouter = Router();

charityRouter.param('charityId', Charities.params);

charityRouter.route('/')
  .get(Charities.all)
  .post(Charities.create);

charityRouter.route('/:charityId')
  .get(Charities.get)
  .put(Charities.update)
  .delete(Charities.destroy);

export default charityRouter;