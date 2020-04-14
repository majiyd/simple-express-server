import Joi from '@hapi/joi';
import { PhoneCall, Contact } from '../../models';
import Response from '../../utils/response';

export default async (req, res) => {
  try {
    const schema = Joi.object({
      type: Joi.string().valid('received', 'outgoing').required(),
      callerID: Joi.number().required(),
    });

    const { error, value } = schema.validate(req.body);
    if (error) return Response.error(res, 'Validation Error', [error.message]);

    const { type, callerID } = value;

    const isValidContact = await Contact.findOne({
      where: {
        id: callerID,
      },
    });

    if (!isValidContact) return Response.error(res, 'Validation Error', [`Contact with id: ${callerID} doesn't exist`]);

    PhoneCall.create({ type, callerID })
      .then((phoneCall) => {
        Response.create(res, 'Phone call added successfully', phoneCall);
      })
      .catch((err) => {
        Response.error(res, 'Failed to create phone call', [err.message]);
      });
  } catch (error) {
    Response.serverError(res, [error.message]);
  }
};
