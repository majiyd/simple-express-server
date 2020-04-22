import jwt from 'jsonwebtoken';
import Response from '../../utils/response';

export default async (req, res) => {
  try {
    let token = req.headers.authorization;
    if (!token) return Response.unAuthorized(res, ['No token provided']);
    token = token.replace('Bearer ', '');

    jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, decoded) => {
      if (err) return Response.unAuthorized(res, [err.message]);

      Response.success(res, 'Authentication successful', { auth: true, decoded });
    });
  } catch (error) {
    Response.serverError(res, [error.message]);
  }
};
