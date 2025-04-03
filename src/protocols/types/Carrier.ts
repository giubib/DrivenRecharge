export interface Carrier {
  id: number;
  name: string;
  code: number;
}

export type CreateCarrier = Omit<Carrier, "id">;
