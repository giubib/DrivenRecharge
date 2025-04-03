import { Request, Response, NextFunction } from "express";
import ClientService from "../services/clients";

export default {
  async getSummary(req: Request, res: Response, next: NextFunction) {
    try {
      const { document } = req.params;
      const summary = await ClientService.getClientSummary(document);
      res.json(summary);
    } catch (error) {
      next(error);
    }
  },
};
