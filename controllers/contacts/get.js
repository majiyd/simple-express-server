import Joi from '@hapi/joi';
import { Contact } from '../../models/contacts';
import GenerateResponse from '../../utils/generateResponse';


const getOne = async (req, res) => {
  const schema = Joi.object({
    id: Joi.number().required(),
  });
  const { error, value } = schema.validate(req.params);

  if (error) return GenerateResponse.error(res, 'Error fetching contact', error.message);


  const { id } = value;
  Contact.findAll({
    where: {
      id,
    },
  })
    .then((contact) => {
      if (Array.isArray(contact) && contact.length === 0) {
        GenerateResponse.notFound(res, 'Error fetching contact', `Contact with id: ${id} not found`);
        return;
      }
      GenerateResponse.get(res, 'Contact fetched successfully', contact);
    })
    .catch((err) => {
      GenerateResponse.notFound(res, `Contact with id: ${id} not found`, err.message);
    });
};

const getAll = async (req, res) => {
  Contact.findAll()
    .then((contacts) => {
      GenerateResponse.get(res, 'Contacts fetched successfully', contacts);
    })
    .catch((err) => {
      GenerateResponse.error(res, 'Error fetching contacts', err.message);
    });
};

export { getOne, getAll };
