
import Joi from '@hapi/joi';
import Response from '../../utils/response';
import { Contact } from '../../models';

export default async (req, res) => {
  try {
    // check if id is valid
    const schema = Joi.object({
      id: Joi.number().required(),
    });
    const { error, value } = schema.validate(req.params);

    if (error) {
      return Response.error(res, 'Validation Error', [error.message]);
    }

    const { id } = value;

    Contact.destroy({
      where: {
        id,
      },
    })
      .then((deletedContact) => {
        if (!deletedContact) {
          return Response.notFound(res, 'Failed to delete contact', [`Contact with id ${id} not found`]);
        }
        Response.delete(res, `Contact with id ${id} deleted`);
      })
      .catch((err) => {
        Response.error(res, `Operation failed with Error: ${err.message}`, [err.message]);
      });
  } catch (error) {
    Response.serverError(res, [error.message]);
  }
};
