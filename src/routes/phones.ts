import { Router } from "express";
import PhoneController from "../controllers/phones";
import { phoneSchema } from "../protocols/schemas/phones";
import validate from "../middlewares/validation";

const router = Router();

router.post("/", validate(phoneSchema), PhoneController.create);
router.get("/:document", PhoneController.getByDocument);

export default router;
