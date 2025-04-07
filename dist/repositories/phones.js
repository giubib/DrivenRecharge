"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../config/database"));
exports.default = {
    async insert(data) {
        const query = `
      INSERT INTO phones (client_id, carrier_id, number, nickname, description)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING 
        id, 
        client_id, 
        carrier_id, 
        number, 
        nickname, 
        description,
        (SELECT name FROM carriers WHERE id = $2) AS carrier_name,
        (SELECT code FROM carriers WHERE id = $2) AS carrier_code
    `;
        const values = [data.client_id, data.carrier_id, data.number, data.nickname, data.description];
        const { rows } = await database_1.default.query(query, values);
        return {
            id: rows[0].id,
            client_id: rows[0].client_id,
            carrier_id: rows[0].carrier_id,
            number: rows[0].number,
            nickname: rows[0].nickname,
            description: rows[0].description,
            carrier: {
                id: data.carrier_id,
                name: rows[0].carrier_name,
                code: rows[0].carrier_code,
            },
        };
    },
    async findByDocument(document) {
        const query = `
      SELECT 
        p.id,
        p.client_id,
        p.carrier_id,
        p.number,
        p.nickname,
        p.description,
        c.name AS carrier_name,
        c.code AS carrier_code
      FROM phones p
      JOIN clients cl ON p.client_id = cl.id
      JOIN carriers c ON p.carrier_id = c.id
      WHERE cl.document = $1
    `;
        const { rows } = await database_1.default.query(query, [document]);
        return rows.map((row) => ({
            id: row.id,
            client_id: row.client_id,
            carrier_id: row.carrier_id,
            number: row.number,
            nickname: row.nickname,
            description: row.description,
            carrier: {
                id: row.carrier_id,
                name: row.carrier_name,
                code: row.carrier_code,
            },
        }));
    },
    async countByClient(client_id) {
        const { rows } = await database_1.default.query("SELECT COUNT(*) FROM phones WHERE client_id = $1", [
            client_id,
        ]);
        return parseInt(rows[0].count);
    },
};
