import express from 'express';
import contactRouter from './contacts';
import othersRouter from './others';

const router = express.Router();

router.use('/contacts', contactRouter);
router.use('/others', othersRouter);


export default router;
