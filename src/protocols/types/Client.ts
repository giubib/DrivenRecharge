import { Carrier } from "./Carrier";
import { Recharge } from "./Recharge";

export interface Client {
  id: number;
  document: string;
  name: string;
}

export type CreateClient = Omit<Client, "id">;

export interface ClientSummary {
  document: string;
  phones: {
    id: number;
    number: string;
    nickname: string;
    description: string;
    carrier: Carrier;
    recharges: Recharge[];
  }[];
}
