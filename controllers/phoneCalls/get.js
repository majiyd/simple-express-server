import Response from '../../utils/response';

export default async (req, res) => {
  try {
    Response.success(res, 'Phonecalls fetched successfully', []);
  } catch (error) {
    Response.serverError(res, [error.message]);
  }
};
