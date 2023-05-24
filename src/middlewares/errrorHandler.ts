import { NextFunction } from "express";
import { ErrorRequestHandler } from "express";
const ErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log("Middleware Error Hadnling called!");
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";
  res.status(errStatus).render("error", {
    error: errMsg,
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
};

export default ErrorHandler;
