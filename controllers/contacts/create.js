
import Joi from '@hapi/joi';
import { Contact } from '../../models';
import Response from '../../utils/response';


export default async (req, res) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      age: Joi.number().required(),
    });
    const { error, value } = schema.validate(req.body);

    if (error) return Response.error(res, 'Validation Error', [error.message]);


    const { name, age } = value;

    Contact.create({ name, age })
      .then((contact) => {
        Response.create(res, 'Contact created successfully', contact);
      })
      .catch((err) => {
        Response.error(res, 'Error creating contact', [err.message]);
      });
  } catch (error) {
    Response.serverError(res, [error.message]);
  }
};
