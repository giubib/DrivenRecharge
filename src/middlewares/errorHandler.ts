import { ErrorRequestHandler } from "express";
import { ValidationError } from "../errors";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  console.error(`[${new Date().toISOString()}] ${err.name}: ${err.message}`);
  if (statusCode >= 500) {
    console.error(err.stack);
  }

  const response: {
    error: string;
    details?: string[];
    stack?: string;
  } = {
    error: statusCode >= 500 ? "Internal Server Error" : err.message,
  };

  if (err instanceof ValidationError && err.details.length > 0) {
    response.details = err.details;
  }

  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

export default errorHandler;
