import jwt from 'jsonwebtoken';
import Response from '../../utils/response';

export default async (req, res) => {
  try {
    const token = jwt.sign({ id: 1 }, process.env.JWT_TOKEN_SECRET, {
      expiresIn: 1200,
    });
    Response.success(res, 'Authentication successful', { auth: true, token });
  } catch (error) {
    Response.serverError(res, [error.message]);
  }
};
