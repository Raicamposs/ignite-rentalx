import { AppError } from "@shared/errors/AppErros";
import { CreateUSerDTO } from "@modules/accounts/dtos/UserCreateDTO";
import { UsersRepository } from "@modules/accounts/repositories/UsersRepository";
import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";





@injectable()
export default class CreateUserUseCase {
  constructor(@inject("UsersRepository") private usersRepository: UsersRepository) { }

  async execute({ name, email, driver_license, password }: CreateUSerDTO): Promise<void> {

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("User already exists!");
    }

    const passwordHash = await hash(password, 8);
    await this.usersRepository.create({ name, email, driver_license, password: passwordHash });
  }
}
