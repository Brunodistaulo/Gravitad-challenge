import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.status) {
    res.status(err.status).json({ message: err.message });
  }

  if (err.name === "ValidationError") {
    res
      .status(400)
      .json({ message: "Error de validación", details: err.errors });
  }

  if (err.name === "MongoError" && err.code === 11000) {
    res.status(400).json({ message: "Registro duplicado" });
  }

  res.status(500).json({ message: "Error interno del servidor" });
};
