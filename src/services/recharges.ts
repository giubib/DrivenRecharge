import RechargeRepository from "../repositories/recharges";
import { ValidationError, NotFoundError } from "../errors";
import { CreateRecharge, RechargeWithPhone, Recharge } from "../protocols/types";

export default {
  async createRecharge(data: CreateRecharge): Promise<Recharge> {
    const phoneExists = await RechargeRepository.phoneExists(data.phone_id);
    if (!phoneExists) {
      throw new NotFoundError("Telefone não cadastrado");
    }

    if (data.amount < 10 || data.amount > 1000) {
      throw new ValidationError("Valor deve estar entre R$10 e R$1000");
    }

    return RechargeRepository.insert(data);
  },

  async getRechargesByNumber(number: string): Promise<RechargeWithPhone[]> {
    const recharges = await RechargeRepository.findByNumber(number);
    if (recharges.length === 0) {
      throw new NotFoundError("Nenhuma recarga encontrada para este número");
    }
    return recharges;
  },
};
