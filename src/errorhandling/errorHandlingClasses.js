class NotFoundError extends Error {
  constructor(resourceType, id) {
    super(`${resourceType} with id ${id} not found!`);
    this.name = "NotFoundError";
  }
}

class InvalidCredentialsError extends Error {
  constructor(resourceType, error) {
    super(`Invalid ${resourceType} credentials! ${error}`);
    this.name = "InvalidCredentialsError";
  }
}

class InternalServerError extends Error {
  constructor(error) {
    super(error);
    this.name = "InternalServerError";
  }
}

class ValidationError extends Error {
  constructor(error) {
    super(error);
    this.name = "ValidationError";
  }
}

export {
  NotFoundError,
  InvalidCredentialsError,
  InternalServerError,
  ValidationError,
};
