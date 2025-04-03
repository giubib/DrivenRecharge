import Joi from "joi";
import { CreatePhone } from "../types/Phone";

export const phoneSchema = Joi.object<CreatePhone>({
  document: Joi.string()
    .pattern(/^\d{11}$/)
    .required()
    .messages({
      "string.pattern.base": "CPF deve ter 11 dígitos numéricos",
      "any.required": "CPF é obrigatório",
    }),

  number: Joi.string()
    .pattern(/^\d{11}$/)
    .required()
    .messages({
      "string.pattern.base": "Número deve ter 11 dígitos com DDD",
      "any.required": "Número é obrigatório",
    }),

  carrier_id: Joi.number().integer().positive().required().messages({
    "number.base": "ID da operadora deve ser numérico",
    "any.required": "Operadora é obrigatória",
  }),

  nickname: Joi.string().min(2).max(50).required().messages({
    "string.min": "Apelido deve ter pelo menos 2 caracteres",
    "any.required": "Apelido é obrigatório",
  }),

  description: Joi.string().min(5).required().messages({
    "string.min": "Descrição deve ter pelo menos 5 caracteres",
    "any.required": "Descrição é obrigatória",
  }),
});
