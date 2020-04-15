import express from 'express';
import phoneCalls from '../controllers/phoneCalls';

const router = express.Router();

router.get('/:uuid', phoneCalls.get);
router.post('/', phoneCalls.create);


export default router;
