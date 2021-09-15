
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { container } from "tsyringe";
import { AppError } from "../../../errors/AppErros";
import { UsersRepository } from "../../../../modules/accounts/repositories/UsersRepository";


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
    const { sub: userId } = verify(token, "484f1c5d540e55294143e3d476346509") as Payload;

    const usersRepository = container.resolve<UsersRepository>("UsersRepository");
    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new AppError("User does not exist!", 401);
    }

    request.user = { id: user.id };

    next();
  } catch (error) {
    throw new AppError("Invalid token!", 401);
  }
}