import { Request, Response, NextFunction } from "express";
import { AnySchema } from "joi";

export default (schema: AnySchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(422).json({
        error: "Dados inválidos",
        details: error.details.map((d) => d.message),
      });
      return;
    }
    next();
  };
