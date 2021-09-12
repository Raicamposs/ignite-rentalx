import { inject, injectable } from "tsyringe";
import { CreateUSerDTO } from "../../dtos/UserCreateDTO";
import { UsersRepository } from "../../repositories/UsersRepository";
import { hash } from "bcrypt";
import { AppError } from "../../../../errors/AppErros";



@injectable()
export default class CreateUserUseCase {
  constructor(@inject("UsersRepository") private usersRepository: UsersRepository) { }

  async execute({ name, email, driver_licence, password }: CreateUSerDTO): Promise<void> {

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("User already exists!");
    }

    const passwordHash = await hash(password, 8);
    await this.usersRepository.create({ name, email, driver_licence, password: passwordHash });
  }
}
