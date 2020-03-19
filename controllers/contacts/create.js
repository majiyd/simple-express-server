
import Joi from '@hapi/joi';
import contacts from '../../data';


export default async (req, res) => {
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
};
