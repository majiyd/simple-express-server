import Joi from '@hapi/joi';
import { Contact } from '../../models';
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

export { getOne, getAll };
