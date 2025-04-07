import Joi from "joi";
import { CreateRecharge } from "../types";

export const rechargeSchema = Joi.object<CreateRecharge>({
  phone_id: Joi.number().integer().positive().required().messages({
    "number.base": "ID do telefone deve ser numérico",
    "any.required": "Telefone é obrigatório",
  }),

  amount: Joi.number().min(10).max(1000).precision(2).required().messages({
    "number.min": "Valor mínimo é R$ 10,00",
    "number.max": "Valor máximo é R$ 1000,00",
    "any.required": "Valor é obrigatório",
  }),
});
