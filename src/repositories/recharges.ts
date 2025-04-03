import pool from "../config/database";
import { CreateRecharge, Recharge, RechargeWithPhone } from "../protocols/types/Recharge";

export default {
  async phoneExists(phoneId: number): Promise<boolean> {
    const { rows } = await pool.query("SELECT 1 FROM phones WHERE id = $1", [phoneId]);
    return rows.length > 0;
  },

  async insert(data: CreateRecharge): Promise<Recharge> {
    const query = `
      INSERT INTO recharges (phone_id, amount)
      VALUES ($1, $2)
      RETURNING *
    `;
    const { rows } = await pool.query(query, [data.phone_id, data.amount]);
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
    const { rows } = await pool.query(query, [number]);
    return rows;
  },
};
