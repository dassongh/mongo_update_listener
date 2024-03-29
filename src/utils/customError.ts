export type Error = CustomError | DBError | ValidationError | NotFoundError;

export class CustomError extends Error {
  status: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.message = message;
    this.status = statusCode;
  }
}

export class DBError extends CustomError {
  static DUPLICATE_VALUE_ERROR_CODE = 11000;

  constructor(error) {
    console.error('DBError: ', error);
    const errorEntity = DBError.getErrorEntity(error);
    super(errorEntity.statusCode, errorEntity.message);
  }

  static getErrorEntity(error) {
    const entity = {
      [DBError.DUPLICATE_VALUE_ERROR_CODE]: () => ({
        statusCode: 400,
        message: `Duplicate value ${JSON.stringify(error.keyValue)}`,
      }),
      default: () => ({ statusCode: 500, message: 'Internal Server Error' }),
    };

    return (entity[error.code] || entity.default)();
  }
}

export class NotFoundError extends CustomError {
  constructor(message = 'Not Found') {
    super(404, message);
  }
}

export class ValidationError extends CustomError {
  constructor(message = 'Validation error') {
    super(400, message);
  }
}
