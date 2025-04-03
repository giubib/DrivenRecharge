"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const phones_1 = __importDefault(require("../repositories/phones"));
const clients_1 = __importDefault(require("../repositories/clients"));
const errors_1 = require("../errors");
exports.default = {
    async createPhone(data) {
        const errors = [];
        if (data.number.length !== 11) {
            errors.push("Número deve conter DDD + 9 dígitos");
        }
        if (!data.carrier_id) {
            errors.push("Operadora é obrigatória");
        }
        if (errors.length > 0) {
            throw new errors_1.ValidationError("Dados inválidos", errors);
        }
        let client = await clients_1.default.findByDocument(data.document);
        if (!client) {
            client = await clients_1.default.createClient(data.document);
        }
        const phoneCount = await phones_1.default.countByClient(client.id);
        if (phoneCount >= 3) {
            throw new errors_1.ConflictError("Limite máximo de 3 telefones por CPF atingido");
        }
        const phoneData = { ...data, client_id: client.id };
        return phones_1.default.insert(phoneData);
    },
    async getPhonesByDocument(document) {
        const phones = await phones_1.default.findByDocument(document);
        if (phones.length === 0) {
            throw new errors_1.NotFoundError("Nenhum telefone encontrado para este CPF");
        }
        return phones;
    },
};
