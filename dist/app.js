"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const phones_1 = __importDefault(require("./routes/phones"));
const recharges_1 = __importDefault(require("./routes/recharges"));
const clients_1 = __importDefault(require("./routes/clients"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/phones", phones_1.default);
app.use("/recharges", recharges_1.default);
app.use("/", clients_1.default);
app.get("/health", (req, res) => {
    res.status(200).json({ status: "healthy" });
});
app.use(errorHandler_1.default);
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
exports.default = app;
