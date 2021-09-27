
import auth from "@config/auth";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../../../errors/AppErros";

interface Payload {
  sub: string
}

export async function ensureAuthenticated(request: Request, _: Response, next: NextFunction): Promise<void> {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authorization.split(' ');
  try {
    const { sub: userId } = verify(token, auth.secretToken) as Payload;

    request.user = { id: userId };

    next();
  } catch (error) {
    return next(new AppError("Invalid token!", 401));
  }
}