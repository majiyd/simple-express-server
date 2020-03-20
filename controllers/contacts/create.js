
import Joi from '@hapi/joi';
import { Contact } from '../../models/contacts';


export default async (req, res) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
    });
    const { error, value } = schema.validate(req.body);

    if (error) {
      res.status(400).json({
        status: 400,
        message: 'Contact must have a name',
        data: { errorMessage: error.message },
      });
      return;
    }

    const { name } = value;

    Contact.create({ name })
      .then((contact) => {
        res.status(201).json({
          status: 201,
          message: 'Contact created successfully',
          data: contact,
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: 400,
          message: 'Error creating contact',
          errors: [err.message],
        });
      });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: `Operation failed with error: ${error.message}`,
      errors: [error.message],
    });
  }
};
