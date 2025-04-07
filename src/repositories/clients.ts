import db from "../config/database";
import pool from "../config/database";
import { Client, ClientSummary, Carrier, Recharge, Phone } from "../protocols/types";
import { NotFoundError } from "../errors";

export default {
  async findByDocument(document: string): Promise<Client | null> {
    const result = await db.query<Client>("SELECT id, document FROM clients WHERE document = $1", [document]);
    return result.rows[0] || null;
  },

  async createClient(document: string): Promise<Client> {
    const result = await db.query<Client>("INSERT INTO clients (document) VALUES ($1) RETURNING id, document", [
      document,
    ]);
    return result.rows[0];
  },

  async getClientSummary(document: string): Promise<ClientSummary> {
    const clientQuery = `
      SELECT id, document 
      FROM clients 
      WHERE document = $1
    `;

    const {
      rows: [client],
    } = await pool.query<Client>(clientQuery, [document]);

    if (!client) {
      throw new NotFoundError("Cliente não encontrado");
    }

    interface PhoneWithCarrierResult extends Phone {
      carrier: Carrier;
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

    const { rows: phones } = await pool.query<PhoneWithCarrierResult>(phonesQuery, [client.id]);

    // Typed recharge query
    const summary: ClientSummary = {
      document: client.document,
      phones: await Promise.all(
        phones.map(async (phone) => {
          const rechargesQuery = `
            SELECT 
              id, 
              amount, 
              date,
              phone_id
            FROM recharges
            WHERE phone_id = $1
            ORDER BY date DESC
          `;

          const { rows: recharges } = await pool.query<Recharge>(rechargesQuery, [phone.id]);

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
              phone_id: recharge.phone_id,
            })),
          };
        })
      ),
    };

    return summary;
  },
};
