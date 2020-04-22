import express from 'express';
import Auth from '../controllers/auth';

const router = express.Router();

router.get('/login', Auth.login);
router.get('/verify', Auth.verify);

export default router;
