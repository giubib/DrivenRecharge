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
