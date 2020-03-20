
import Joi from '@hapi/joi';
import { Contact } from '../../models/contacts';
import GenerateResponse from '../../utils/generateResponse';


export default async (req, res) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
    });
    const { error, value } = schema.validate(req.body);

    if (error) return GenerateResponse.error(res, 'Contact must have a name', error.message);


    const { name } = value;

    Contact.create({ name })
      .then((contact) => {
        GenerateResponse.create(res, 'Contact created successfully', contact);
      })
      .catch((err) => {
        GenerateResponse.error(res, 'Error creating contact', err.message);
      });
  } catch (error) {
    GenerateResponse.error(res, `Operation failed with error: ${error.message}`, error.message);
  }
};
