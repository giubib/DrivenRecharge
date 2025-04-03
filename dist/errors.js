"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = exports.DatabaseError = exports.ConflictError = exports.ValidationError = void 0;
class ValidationError extends Error {
    details;
    statusCode;
    constructor(message, details = [], statusCode = 422) {
        super(message);
        this.details = details;
        this.statusCode = statusCode;
        this.name = "ValidationError";
    }
}
exports.ValidationError = ValidationError;
class ConflictError extends Error {
    statusCode;
    constructor(message, statusCode = 409) {
        super(message);
        this.statusCode = statusCode;
        this.name = "ConflictError";
    }
}
exports.ConflictError = ConflictError;
class DatabaseError extends Error {
    statusCode;
    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        this.name = "DatabaseError";
    }
}
exports.DatabaseError = DatabaseError;
class NotFoundError extends Error {
    statusCode;
    constructor(message, statusCode = 404) {
        super(message);
        this.statusCode = statusCode;
        this.name = "NotFoundError";
    }
}
exports.NotFoundError = NotFoundError;
