import { Router } from 'express';
import { charityRouter, userRouter } from './routes';

const router = Router();

router.use('/charities/', charityRouter);
router.use('/users/', userRouter);

export default router;