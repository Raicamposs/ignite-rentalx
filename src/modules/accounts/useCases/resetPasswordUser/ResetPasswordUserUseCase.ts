
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens";
import { UsersRepository } from "@modules/accounts/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/accounts/repositories/UsersTokensRepository";
import { DateProvider } from "@shared/container/providers/DateProvider/DateProvider";
import { AppError } from "@shared/errors/AppErros";
import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject("UsersTokensRepository") private usersTokensRepository: UsersTokensRepository,
    @inject("DateProvider") private dateProvider: DateProvider,
    @inject("UsersRepository") private usersRepository: UsersRepository
  ) { }


  async execute({ token, password }: IRequest): Promise<void> {

    const userToken = await this.findUserToken(token);

    const user = await this.usersRepository.findById(userToken.userId);

    user.password = await hash(password, 8);

    await this.usersRepository.create(user);

    await this.usersTokensRepository.deleteById(userToken.id);
  }

  private async findUserToken(token: string): Promise<UserTokens> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(
      token
    );

    if (!userToken) {
      throw new AppError("Token invalid!");
    }

    if (this.dateProvider.compareIfBefore(userToken.expiresDate, new Date())) {
      throw new AppError("Token expired!");
    }

    return userToken;
  }
}

export { ResetPasswordUserUseCase };

