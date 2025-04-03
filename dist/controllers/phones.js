"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const phones_1 = __importDefault(require("../services/phones"));
exports.default = {
    async create(req, res) {
        try {
            console.log("Request body recebido:", req.body);
            const phoneData = req.body;
            const newPhone = await phones_1.default.createPhone(phoneData);
            res.status(201).json(newPhone);
        }
        catch (error) {
            res.status(error.status || 500).json({ error: error.message });
        }
    },
    async getByDocument(req, res) {
        try {
            const { document } = req.params;
            const phones = await phones_1.default.getPhonesByDocument(document);
            res.status(200).json(phones);
        }
        catch (error) {
            res.status(error.status || 500).json({ error: error.message });
        }
    },
};
