import Joi from '@hapi/joi';
import { Contact } from '../../models/contacts';
import Response from '../../utils/response';


const getOne = async (req, res) => {
  const schema = Joi.object({
    id: Joi.number().required(),
  });
  const { error, value } = schema.validate(req.params);

  if (error) return Response.error(res, 'Error fetching contact', error.message);


  const { id } = value;
  Contact.findAll({
    where: {
      id,
    },
  })
    .then((contact) => {
      if (Array.isArray(contact) && contact.length === 0) {
        Response.notFound(res, 'Error fetching contact', `Contact with id: ${id} not found`);
        return;
      }
      Response.get(res, 'Contact fetched successfully', contact);
    })
    .catch((err) => {
      Response.notFound(res, `Contact with id: ${id} not found`, err.message);
    });
};

const getAll = async (req, res) => {
  Contact.findAll()
    .then((contacts) => {
      Response.get(res, 'Contacts fetched successfully', contacts);
    })
    .catch((err) => {
      Response.error(res, 'Error fetching contacts', err.message);
    });
};

export { getOne, getAll };
