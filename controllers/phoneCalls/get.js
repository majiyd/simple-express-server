import Joi from '@hapi/joi';
import Response from '../../utils/response';
import { PhoneCall } from '../../models';

export default async (req, res) => {
  try {
    const schema = Joi.object({
      uuid: Joi.string().uuid().required(),
    });

    const { error, value } = schema.validate(req.params);
    if (error) return Response.error(res, 'Validation Error', [error.message]);

    const { uuid } = value;
    PhoneCall.findOne({
      where: {
        uuid,
      },
    })
      .then((phoneCall) => {
        if (!phoneCall) Response.notFound(res, 'Phone call not found', [`Phone call with uuid: ${uuid} doesn't exist`]);

        Response.success(res, 'Phone call fetched successfully', phoneCall);
      })
      .catch((err) => {
        Response.error(res, 'Error retrieving phone call', [err.message]);
      });
  } catch (error) {
    Response.serverError(res, [error.message]);
  }
};
