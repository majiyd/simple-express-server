import express from 'express';
import contactRouter from './contacts';
import othersRouter from './others';
import phoneCallsRouter from './phoneCalls';

const router = express.Router();

router.use('/contacts', contactRouter);
router.use('/others', othersRouter);
router.use('/phone-calls', phoneCallsRouter);


export default router;
