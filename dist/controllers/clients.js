"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const clients_1 = __importDefault(require("../services/clients"));
exports.default = {
    async getSummary(req, res, next) {
        try {
            const { document } = req.params;
            const summary = await clients_1.default.getClientSummary(document);
            res.json(summary);
        }
        catch (error) {
            next(error);
        }
    },
};
