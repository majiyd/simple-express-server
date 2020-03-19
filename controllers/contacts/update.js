import Joi from '@hapi/joi';
import contacts from '../../data';

export default async (req, res) => {
  try {
    const nameSchema = Joi.object({
      name: Joi.string().required(),
    });
    const idSchema = Joi.object({
      id: Joi.number().less(contacts.length + 1).required(),
    });

    const isValidName = nameSchema.validate(req.body);
    const isValidID = idSchema.validate(req.params);

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
    res.status(400).send(`Operation failed with Error: ${e.message}`);
  }
};
