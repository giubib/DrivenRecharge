"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(`[${new Date().toISOString()}] ${err.name}: ${err.message}`);
    if (statusCode >= 500) {
        console.error(err.stack);
    }
    const response = {
        error: statusCode >= 500 ? "Internal Server Error" : err.message,
    };
    if (err instanceof errors_1.ValidationError && err.details.length > 0) {
        response.details = err.details;
    }
    if (process.env.NODE_ENV === "development") {
        response.stack = err.stack;
    }
    res.status(statusCode).json(response);
};
exports.default = errorHandler;
