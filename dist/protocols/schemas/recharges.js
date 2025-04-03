"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rechargeSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.rechargeSchema = joi_1.default.object({
    phone_id: joi_1.default.number().integer().positive().required().messages({
        "number.base": "ID do telefone deve ser numérico",
        "any.required": "Telefone é obrigatório",
    }),
    amount: joi_1.default.number().min(10).max(1000).precision(2).required().messages({
        "number.min": "Valor mínimo é R$ 10,00",
        "number.max": "Valor máximo é R$ 1000,00",
        "any.required": "Valor é obrigatório",
    }),
});
