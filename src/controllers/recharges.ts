import { Request, Response } from "express";
import RechargeService from "../services/recharges";

export default {
  async create(req: Request, res: Response) {
    try {
      const rechargeData = req.body;
      const newRecharge = await RechargeService.createRecharge(rechargeData);
      res.status(201).json(newRecharge);
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  },

  async getByNumber(req: Request, res: Response) {
    try {
      const { number } = req.params;
      const recharges = await RechargeService.getRechargesByNumber(number);
      res.status(200).json(recharges);
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  },
};
