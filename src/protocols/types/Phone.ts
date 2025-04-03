import { Carrier } from "./Carrier";

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
