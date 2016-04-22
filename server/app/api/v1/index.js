import { Router } from 'express';
import userRouter from './user/routes';
import charityRouter from './charity/routes';

const router = Router();

router.use('/users/', userRouter);
router.use('/charities/', charityRouter);

export default router;
