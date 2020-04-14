import express from 'express';
import phoneCalls from '../controllers/phoneCalls';

const router = express.Router();

router.get('/', phoneCalls.getAll);
router.post('/create', phoneCalls.create);

export default router;
