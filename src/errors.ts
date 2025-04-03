export class ValidationError extends Error {
  constructor(message: string, public details: string[] = [], public statusCode = 422) {
    super(message);
    this.name = "ValidationError";
  }
}

export class ConflictError extends Error {
  constructor(message: string, public statusCode = 409) {
    super(message);
    this.name = "ConflictError";
  }
}

export class DatabaseError extends Error {
  constructor(message: string, public statusCode = 500) {
    super(message);
    this.name = "DatabaseError";
  }
}

export class NotFoundError extends Error {
  constructor(message: string, public statusCode = 404) {
    super(message);
    this.name = "NotFoundError";
  }
}
