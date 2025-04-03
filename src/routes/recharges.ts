import { Router } from "express";
import RechargeController from "../controllers/recharges";
import { rechargeSchema } from "../protocols/schemas/recharges";
import validate from "../middlewares/validation";

const router = Router();

router.post("/", validate(rechargeSchema), RechargeController.create);
router.get("/:number", RechargeController.getByNumber);

export default router;
