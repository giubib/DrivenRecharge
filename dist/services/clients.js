"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const clients_1 = __importDefault(require("../repositories/clients"));
exports.default = {
    async getClientSummary(document) {
        return clients_1.default.getClientSummary(document);
    },
};
