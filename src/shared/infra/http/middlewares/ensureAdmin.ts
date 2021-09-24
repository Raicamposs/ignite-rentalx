import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { UsersRepository } from "../../../../modules/accounts/repositories/UsersRepository";
import { AppError } from "../../../errors/AppErros";




export async function ensureAdmin(request: Request, _: Response, next: NextFunction): Promise<void> {
  let { id } = request.user ?? {};

  if (!id) {
    throw new AppError("Token missing", 401);
  }

  const usersRepository = container.resolve<UsersRepository>("UsersRepository");
  const user: User = await usersRepository.findById(id);

  if (!user) {
    throw new AppError("User does not exist!", 401);
  }

  if (!(user?.admin ?? false)) {
    throw new AppError("User is not admin!", 401);
  }

  return next();

}