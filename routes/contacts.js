import express from 'express';
import Contacts from '../controllers/contacts';

const router = express.Router();

router.get('/', Contacts.getAll);

router.post('/', Contacts.create);

router.get('/:id', Contacts.getOne);

router.get('/:id/phone-calls', Contacts.getPhoneCalls);

router.put('/:id', Contacts.update);

router.delete('/:id', Contacts.remove);

export default router;
