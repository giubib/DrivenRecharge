import pool from "../config/database";
import { PhoneWithCarrier, CreatePhone } from "../protocols/types/Phone";

export default {
  async insert(data: CreatePhone): Promise<PhoneWithCarrier> {
    const query = `
      INSERT INTO phones (client_id, carrier_id, number, nickname, description)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *, (SELECT name FROM carriers WHERE id = $2) AS carrier_name
    `;
    const values = [data.client_id, data.carrier_id, data.number, data.nickname, data.description];

    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  async findByDocument(document: string): Promise<PhoneWithCarrier[]> {
    const query = `
      SELECT p.*, c.name AS carrier_name 
      FROM phones p
      JOIN clients cl ON p.client_id = cl.id
      JOIN carriers c ON p.carrier_id = c.id
      WHERE cl.document = $1
    `;
    const { rows } = await pool.query(query, [document]);
    return rows;
  },
  async countByClient(client_id: number): Promise<number> {
    const { rows } = await pool.query("SELECT COUNT(*) FROM phones WHERE client_id = $1", [client_id]);
    return parseInt(rows[0].count);
  },
};
