"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(422).json({
            error: "Dados inválidos",
            details: error.details.map((d) => d.message),
        });
        return;
    }
    next();
};
