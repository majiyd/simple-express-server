import express from 'express';
import contactRouter from './contacts';
import phoneCallsRouter from './phoneCalls';

const router = express.Router();

router.use('/contacts', contactRouter);
router.use('/phone-calls', phoneCallsRouter);


export default router;
