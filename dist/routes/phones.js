"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const phones_1 = __importDefault(require("../controllers/phones"));
const phones_2 = require("../protocols/schemas/phones");
const validation_1 = __importDefault(require("../middlewares/validation"));
const router = (0, express_1.Router)();
router.post("/", (0, validation_1.default)(phones_2.phoneSchema), phones_1.default.create);
router.get("/:document", phones_1.default.getByDocument);
exports.default = router;
