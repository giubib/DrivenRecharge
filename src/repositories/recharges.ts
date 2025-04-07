import pool from "../config/database";
import { Recharge, CreateRecharge, RechargeWithPhone } from "../protocols/types";

interface RechargeDBResult extends Recharge {
  phone_number: string;
}

export default {
  async insert(data: CreateRecharge): Promise<Recharge> {
    const query = `
      INSERT INTO recharges (phone_id, amount)
      VALUES ($1, $2)
      RETURNING id, phone_id, amount, date
    `;
    const { rows } = await pool.query<Recharge>(query, [data.phone_id, data.amount]);
    return rows[0];
  },

  async findByNumber(number: string): Promise<RechargeWithPhone[]> {
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
    const { rows } = await pool.query<RechargeDBResult>(query, [number]);
    return rows;
  },

  async phoneExists(phone_id: number): Promise<boolean> {
    const query = `
      SELECT EXISTS(SELECT 1 FROM phones WHERE id = $1)
    `;
    const { rows } = await pool.query<{ exists: boolean }>(query, [phone_id]);
    return rows[0].exists;
  },
};
