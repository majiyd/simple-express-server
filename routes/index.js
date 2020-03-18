import express from 'express';
import Joi from '@hapi/joi';

const router = express.Router();

let contacts = [
  { id: 1, name: 'jean' },
  { id: 2, name: 'saul' },
  { id: 3, name: 'dave' },
];

router.get('/contacts', async (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Contacts fetched successfully',
    data: contacts,
  });
});

router.post('/contacts', async (req, res) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
    });
    const { error, value } = schema.validate(req.body);

    if (error) {
      res.status(400).json({
        status: 400,
        message: 'Contact must have a name',
        data: { errorMessage: error.message },
      });
      return;
    }
    const contact = {
      id: contacts.length + 1,
      name: value.name,
    };
    contacts.push(contact);
    res.status(201).send(contact);
  } catch (error) {
    res.status(400).send(`Operation failed with error: ${error.message}`);
  }
});


router.get('/contacts/:id', async (req, res) => {
  const { id } = req.params;
  const contact = contacts.find((c) => c.id === Number(id));
  contact
    ? res.status(200).send(contact)
    : res.status(404).send(`Contact with id: ${id} not found`);
});

router.put('/contacts/:id', async (req, res) => {
  try {
    const nameSchema = Joi.object({
      name: Joi.string().required(),
    });
    const idSchema = Joi.object({
      id: Joi.number().less(contacts.length + 1).required(),
    });

    const isValidName = nameSchema.validate(req.body);
    const isValidID = idSchema.validate(req.params);
    console.log(isValidName.error, isValidID.error);

    if (isValidName.error) {
      res.status(400).send('Contact must have a name');
      return;
    }
    if (isValidID.error) {
      res.status(400).send(`ID is invalid, ${isValidID.error.message}`);
      return;
    }

    const newContacts = contacts.map((contact) => {
      if (contact.id === Number(req.params.id)) {
        const c = {
          id: contact.id,
          name: req.body.name,
        };
        return c;
      }
      return contact;
    });

    const contact = {
      id: req.params.id,
      name: req.body.name,
    };

    contacts = newContacts;

    res.status(200).send(contact);
  } catch (e) {
    console.log(e.message);
    res.status(400).send(`Operation failed with Error: ${e.message}`);
  }
});

router.delete('/contacts/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // check if is valid is
    const schema = Joi.object({
      id: Joi.number().required(),
    });
    const { error } = schema.validate(req.params);

    if (error) return res.status(400).send(error.message);

    // check if id exists
    const filteredContacts = contacts.filter((contact) => contact.id !== Number(id));

    if (filteredContacts.length === contacts.length) return res.status(404).send(`ID ${id} is invalid`);
    // return ok
    contacts = filteredContacts;
    res.status(204).send(`Contact with id ${id} deleted`);
  } catch (e) {
    console.log('Failed with Error:', e.message);
  }
});

export default router;
