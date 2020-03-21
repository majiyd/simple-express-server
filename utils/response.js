export default class Response {
  static get(res, message, data) {
    return res.status(200).json({
      status: 200,
      message,
      data,
    });
  }

  static async create(res, message, data) {
    return res.status(201).json({
      status: 201,
      message,
      data,
    });
  }

  static async delete(res, message, data) {
    return res.status(200).json({
      status: 200,
      message,
      data,
    });
  }

  static async notFound(res, message, data) {
    return res.status(404).json({
      status: 404,
      message,
      errors: data,
    });
  }

  static async error(res, message, data, status) {
    const _status = status || 400;
    return res.status(_status).json({
      status: _status,
      message,
      errors: data,
    });
  }
}
