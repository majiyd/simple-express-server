
import Joi from '@hapi/joi';
import { Contact } from '../../models/contacts';
import Response from '../../utils/response';


export default async (req, res) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
    });
    const { error, value } = schema.validate(req.body);

    if (error) return Response.error(res, 'Contact must have a name', [error.message]);


    const { name } = value;

    Contact.create({ name })
      .then((contact) => {
        Response.create(res, 'Contact created successfully', contact);
      })
      .catch((err) => {
        Response.error(res, 'Error creating contact', [err.message]);
      });
  } catch (error) {
    Response.error(res, `Operation failed with error: ${error.message}`, [error.message]);
  }
};
