import Joi from '@hapi/joi';
import { Contact, PhoneCall } from '../../models';
import Response from '../../utils/response';


const getOne = async (req, res) => {
  const schema = Joi.object({
    id: Joi.number().required(),
  });
  const { error, value } = schema.validate(req.params);

  if (error) {
    return Response.error(res, 'Validation Error', error.message);
  }

  const { id } = value;
  Contact.findAll({
    where: {
      id,
    },
  })
    .then((contact) => {
      if (Array.isArray(contact) && contact.length === 0) {
        Response.notFound(res, 'Error fetching contact', [`Contact with id: ${id} not found`]);
        return;
      }
      Response.success(res, 'Contact fetched successfully', contact);
    })
    .catch((err) => {
      Response.error(res, `Operation failed with Error: ${err.message}`, err.message);
    });
};

const getAll = async (req, res) => {
  Contact.findAll()
    .then((contacts) => {
      Response.success(res, 'Contacts fetched successfully', contacts);
    })
    .catch((err) => {
      Response.error(res, 'Error fetching contacts', err.message);
    });
};

const getPhoneCalls = async (req, res) => {
  try {
    const schema = Joi.object({
      id: Joi.number().required(),
    });
    const { error, value } = schema.validate(req.params);

    if (error) {
      return Response.error(res, 'Validation Error', error.message);
    }

    const { id } = value;
    const isContact = await Contact.findOne({
      where: {
        id,
      },
    });

    if (!isContact) Response.notFound(res, 'Error fetching phone calls', [`Contact with id: ${id} not found`]);

    Contact.findOne({
      attributes: ['id', 'name'],
      where: {
        id,
      },
      include: [{
        model: PhoneCall,
      }],
    })
      .then((phoneCalls) => {
        Response.success(res, 'Phone calls fetched successfully', phoneCalls);
      })
      .catch((err) => {
        Response.error(res, `Operation failed with Error: ${err.message}`, err.message);
      });
  } catch (error) {
    Response.serverError(res, [error.message]);
  }
};

export { getOne, getAll, getPhoneCalls };
