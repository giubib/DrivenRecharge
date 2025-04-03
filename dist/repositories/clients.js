"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../config/database"));
const database_2 = __importDefault(require("../config/database"));
const errors_1 = require("../errors");
exports.default = {
    async findByDocument(document) {
        const result = await database_1.default.query("SELECT * FROM clients WHERE document = $1", [document]);
        return result.rows[0] || null;
    },
    async createClient(document) {
        const result = await database_1.default.query("INSERT INTO clients (document) VALUES ($1) RETURNING *", [document]);
        return result.rows[0];
    },
    async getClientSummary(document) {
        const clientQuery = `
      SELECT id, document, name 
      FROM clients 
      WHERE document = $1
    `;
        const { rows: [client], } = await database_2.default.query(clientQuery, [document]);
        if (!client) {
            throw new errors_1.NotFoundError("Cliente não encontrado");
        }
        const phonesQuery = `
      SELECT 
        p.id,
        p.number,
        p.nickname,
        p.description,
        json_build_object(
          'id', c.id,
          'name', c.name,
          'code', c.code
        ) as carrier
      FROM phones p
      JOIN carriers c ON p.carrier_id = c.id
      WHERE p.client_id = $1
    `;
        const { rows: phones } = await database_2.default.query(phonesQuery, [client.id]);
        const summary = {
            document: client.document,
            phones: await Promise.all(phones.map(async (phone) => {
                const rechargesQuery = `
            SELECT 
              id, 
              amount, 
              date,
              phone_id as "phoneId"
            FROM recharges
            WHERE phone_id = $1
            ORDER BY date DESC
          `;
                const { rows: recharges } = await database_2.default.query(rechargesQuery, [phone.id]);
                return {
                    id: phone.id,
                    number: phone.number,
                    nickname: phone.nickname,
                    description: phone.description,
                    carrier: phone.carrier,
                    recharges: recharges.map((recharge) => ({
                        id: recharge.id,
                        amount: recharge.amount,
                        date: recharge.date,
                        phoneId: recharge.phoneId,
                    })),
                };
            })),
        };
        return summary;
    },
};
