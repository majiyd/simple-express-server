import Joi from '@hapi/joi';
import { Contact } from '../../models';
import Response from '../../utils/response';

export default async (req, res) => {
  try {
    const userDataSchema = Joi.object({
      name: Joi.string().required(),
      age: Joi.number().required(),
    });
    const idSchema = Joi.object({
      id: Joi.number().required(),
    });

    const isValidUserData = userDataSchema.validate(req.body);
    const isValidID = idSchema.validate(req.params);

    if (isValidUserData.error) {
      return Response.error(res, 'Contact must have a name', [isValidUserData.error.message]);
    }
    if (isValidID.error) {
      return Response.error(res, 'ID is invalid', [isValidID.error.message]);
    }


    const { name, age, id } = { ...isValidUserData.value, ...isValidID.value };

    Contact.update({ name, age }, {
      where: {
        id,
      },
    })
      .then((contact) => {
        if (!contact[0]) {
          return Response.notFound(res, 'Error updating contact', [`Contact with id: ${id} doesn't exist`]);
        }
        Response.success(res, 'Contact updated successfully', { id, name, age });
      })
      .catch((err) => {
        Response.error(res, `Operation failed with Error: ${err.message}`, [err.message]);
      });
  } catch (error) {
    Response.serverError(res, [error.message]);
  }
};
