import express from 'express';
import Auth from '../controllers/auth';

const router = express.Router();

router.get('/login', Auth.login);

export default router;
