
import Joi from '@hapi/joi';
import contacts from '../../data';
import Response from '../../utils/response';

export default async (req, res) => {
  try {
    const { id } = req.params;

    // check if id is valid
    const schema = Joi.object({
      id: Joi.number().required(),
    });
    const { error } = schema.validate(req.params);

    if (error) {
      return Response.error(res, 'Failed to delete contact', error.message);
    }

    // check if id exists
    const filteredContacts = contacts.filter((contact) => contact.id !== Number(id));

    if (filteredContacts.length === contacts.length) return res.status(404).send(`ID ${id} is invalid`);
    // return ok
    contacts = filteredContacts;
    res.status(204).send(`Contact with id ${id} deleted`);
  } catch (e) {
    res.status(400).send(`Operation failed with Error: ${e.message}`);
  }
};
