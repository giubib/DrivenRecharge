import { Router } from "express";
import ClientController from "../controllers/clients";

const router = Router();

router.get("/summary/:document", ClientController.getSummary);

export default router;
