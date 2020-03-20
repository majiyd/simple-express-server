export default class GenerateResponse {
  constructor(res, message, data, status) {
    this.res = res;
    this.message = message;
    this.data = data;
    this.status = status;
  }

  static async get() {
    return this.res.status(200).json({
      status: 200,
      message: this.message,
      data: this.data,
    });
  }

  static async create() {
    return this.res.status(201).json({
      status: 201,
      message: this.message,
      data: this.data,
    });
  }

  static async notFound() {
    return this.res.status(404).json({
      status: 404,
      message: this.message,
      errors: [this.data],
    });
  }

  static async error() {
    const status = this.status ? this.status : 400;
    return this.res.status(status).json({
      status,
      message: this.message,
      errors: [this.data],
    });
  }
}
