import express from 'express';
import contactRouter from './contacts';
import phoneCallsRouter from './phoneCalls';
import authRouter from './auth';

const router = express.Router();

router.use('/contacts', contactRouter);
router.use('/phone-calls', phoneCallsRouter);
router.use('/auth', authRouter);


export default router;
