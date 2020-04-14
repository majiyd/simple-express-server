import Joi from '@hapi/joi';
import { PhoneCall } from '../../models';
import Response from '../../utils/response';

export default async (req, res) => {
  try {
    const { type, callerID } = req.body;
    PhoneCall.create({ type, callerID })
      .then((phoneCall) => {
        Response.create(res, 'Phone call added successfully', phoneCall);
      })
      .catch((err) => {
        console.log('err', err);
        Response.error(res, 'Failed to create phone call', [err.message]);
      });
  } catch (error) {
    Response.serverError(res, [error.message]);
  }
};
