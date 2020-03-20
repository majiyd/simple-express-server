import Joi from '@hapi/joi';
import { Contact } from '../../models/contacts';

const getOne = async (req, res) => {
  const schema = Joi.object({
    id: Joi.number().required(),
  });
  const { error, value } = schema.validate(req.params);
  if (error) {
    res.status(400).json({
      status: 400,
      message: 'Error fetching contact',
      errors: [error.message],
    });
    return;
  }
  const { id } = value;
  Contact.findAll({
    where: {
      id,
    },
  })
    .then((contact) => {
      if (Array.isArray(contact) && contact.length === 0) {
        res.status(404).json({
          status: 404,
          message: 'Error fetching contact',
          errors: [`Contact with id: ${id} not found`],
        });
        return;
      }
      res.status(200).json({
        status: 200,
        message: 'Contact fetched successfully',
        data: contact,
      });
    })
    .catch((err) => {
      res.status(404).json({
        status: 404,
        message: `Contact with id: ${id} not found`,
        errors: [err.message],
      });
    });
};

const getAll = async (req, res) => {
  Contact.findAll()
    .then((contacts) => {
      res.status(200).json({
        status: 200,
        message: 'Contacts fetched successfully',
        data: contacts,
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: 400,
        message: 'Error fetching contacts',
        errors: [err.message],
      });
    });
};

export { getOne, getAll };
