import { Request, Response } from "express";
import PhoneService from "../services/phones";
import { CreatePhone } from "../protocols/types";

export default {
  async create(req: Request, res: Response) {
    try {
      console.log("Request body recebido:", req.body);
      const phoneData: CreatePhone = req.body;
      const newPhone = await PhoneService.createPhone(phoneData);
      res.status(201).json(newPhone);
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  },

  async getByDocument(req: Request, res: Response) {
    try {
      const { document } = req.params;
      const phones = await PhoneService.getPhonesByDocument(document);
      res.status(200).json(phones);
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  },
};
