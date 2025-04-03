"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../config/database"));
exports.default = {
    async phoneExists(phoneId) {
        const { rows } = await database_1.default.query("SELECT 1 FROM phones WHERE id = $1", [phoneId]);
        return rows.length > 0;
    },
    async insert(data) {
        const query = `
      INSERT INTO recharges (phone_id, amount)
      VALUES ($1, $2)
      RETURNING *
    `;
        const { rows } = await database_1.default.query(query, [data.phone_id, data.amount]);
        return rows[0];
    },
    async findByNumber(number) {
        const query = `
      SELECT 
        r.id,
        r.phone_id,
        r.amount,
        r.date,  
        p.number as phone_number
      FROM recharges r
      JOIN phones p ON r.phone_id = p.id
      WHERE p.number = $1
      ORDER BY r.date DESC  
    `;
        const { rows } = await database_1.default.query(query, [number]);
        return rows;
    },
};
