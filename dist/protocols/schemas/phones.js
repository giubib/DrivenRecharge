"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.phoneSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.phoneSchema = joi_1.default.object({
    document: joi_1.default.string()
        .pattern(/^\d{11}$/)
        .required()
        .messages({
        "string.pattern.base": "CPF deve ter 11 dígitos numéricos",
        "any.required": "CPF é obrigatório",
    }),
    number: joi_1.default.string()
        .pattern(/^\d{11}$/)
        .required()
        .messages({
        "string.pattern.base": "Número deve ter 11 dígitos com DDD",
        "any.required": "Número é obrigatório",
    }),
    carrier_id: joi_1.default.number().integer().positive().required().messages({
        "number.base": "ID da operadora deve ser numérico",
        "any.required": "Operadora é obrigatória",
    }),
    nickname: joi_1.default.string().min(2).max(50).required().messages({
        "string.min": "Apelido deve ter pelo menos 2 caracteres",
        "any.required": "Apelido é obrigatório",
    }),
    description: joi_1.default.string().min(5).required().messages({
        "string.min": "Descrição deve ter pelo menos 5 caracteres",
        "any.required": "Descrição é obrigatória",
    }),
});
