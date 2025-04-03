"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recharges_1 = __importDefault(require("../controllers/recharges"));
const recharges_2 = require("../protocols/schemas/recharges");
const validation_1 = __importDefault(require("../middlewares/validation"));
const router = (0, express_1.Router)();
router.post("/", (0, validation_1.default)(recharges_2.rechargeSchema), recharges_1.default.create);
router.get("/:number", recharges_1.default.getByNumber);
exports.default = router;
