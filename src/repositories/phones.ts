import pool from "../config/database";
import { Phone, PhoneWithCarrier, CreatePhone } from "../protocols/types";

interface PhoneDBResult extends Phone {
  carrier_name: string;
}

export default {
  async insert(data: CreatePhone): Promise<PhoneWithCarrier> {
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

    const { rows } = await pool.query<PhoneDBResult>(query, values);

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

  async findByDocument(document: string): Promise<PhoneWithCarrier[]> {
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

    const { rows } = await pool.query<PhoneDBResult>(query, [document]);

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

  async countByClient(client_id: number): Promise<number> {
    const { rows } = await pool.query<{ count: string }>("SELECT COUNT(*) FROM phones WHERE client_id = $1", [
      client_id,
    ]);
    return parseInt(rows[0].count);
  },
};
