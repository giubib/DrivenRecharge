"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const recharges_1 = __importDefault(require("../repositories/recharges"));
const errors_1 = require("../errors");
exports.default = {
    async createRecharge(data) {
        if (!(await recharges_1.default.phoneExists(data.phone_id))) {
            throw new errors_1.NotFoundError("Telefone não cadastrado");
        }
        if (data.amount < 10 || data.amount > 1000) {
            throw new errors_1.ValidationError("Valor deve estar entre R$10 e R$1000");
        }
        return recharges_1.default.insert(data);
    },
    async getRechargesByNumber(number) {
        const recharges = await recharges_1.default.findByNumber(number);
        if (recharges.length === 0) {
            throw new errors_1.NotFoundError("Nenhuma recarga encontrada para este número");
        }
        return recharges;
    },
};
