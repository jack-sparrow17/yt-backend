class ApiResponse {
  constructor(statusCode, data, msg = "success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = msg;
    this.success = statusCode < 400;
  }
}

export { ApiResponse };
