import Joi from '@hapi/joi';
import { Contact } from '../../models';
import Response from '../../utils/response';

export default async (req, res) => {
  try {
    const nameSchema = Joi.object({
      name: Joi.string().required(),
    });
    const idSchema = Joi.object({
      id: Joi.number().required(),
    });

    const isValidName = nameSchema.validate(req.body);
    const isValidID = idSchema.validate(req.params);

    if (isValidName.error) {
      return Response.error(res, 'Contact must have a name', [isValidName.error.message]);
    }
    if (isValidID.error) {
      return Response.error(res, 'ID is invalid', [isValidID.error.message]);
    }


    const { name, id } = { ...isValidName.value, ...isValidID.value };

    Contact.update({ name }, {
      where: {
        id,
      },
    })
      .then((contact) => {
        if (!contact[0]) {
          return Response.notFound(res, 'Error deleting contact', [`Contact with id: ${id} doesn't exist`]);
        }
        Response.success(res, 'Contact updated successfully', { id, name });
      })
      .catch((err) => {
        Response.error(res, `Operation failed with Error: ${err.message}`, [err.message]);
      });
  } catch (error) {
    Response.error(res, `Operation failed with Error: ${error.message}`, [error.message]);
  }
};
