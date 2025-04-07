export interface Carrier {
  id: number;
  name: string;
  code: number;
}

export type CreateCarrier = Omit<Carrier, "id">;

export interface Client {
  id: number;
  document: string;
}

export type CreateClient = Omit<Client, "id">;

export interface Phone {
  id: number;
  client_id: number;
  carrier_id: number;
  number: string;
  nickname: string;
  description: string;
}

export interface PhoneWithCarrier extends Phone {
  carrier: Carrier;
}

export type CreatePhone = Omit<Phone, "id"> & {
  document: string;
};

export interface Recharge {
  id: number;
  phone_id: number;
  amount: number;
  date: Date;
}

export type CreateRecharge = Omit<Recharge, "id" | "date">;

export interface RechargeWithPhone extends Recharge {
  phone_number: string;
}

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
