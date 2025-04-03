"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const recharges_1 = __importDefault(require("../services/recharges"));
exports.default = {
    async create(req, res) {
        try {
            const rechargeData = req.body;
            const newRecharge = await recharges_1.default.createRecharge(rechargeData);
            res.status(201).json(newRecharge);
        }
        catch (error) {
            res.status(error.status || 500).json({ error: error.message });
        }
    },
    async getByNumber(req, res) {
        try {
            const { number } = req.params;
            const recharges = await recharges_1.default.getRechargesByNumber(number);
            res.status(200).json(recharges);
        }
        catch (error) {
            res.status(error.status || 500).json({ error: error.message });
        }
    },
};
