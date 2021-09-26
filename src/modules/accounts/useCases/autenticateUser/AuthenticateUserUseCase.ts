import auth from "@config/auth";
import { UsersRepository } from "@modules/accounts/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/accounts/repositories/UsersTokensRepository";
import { DateProvider } from "@shared/container/providers/DateProvider/DateProvider";
import { AppError } from "@shared/errors/AppErros";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { User } from './../../infra/typeorm/entities/User';



interface Request {
  email: string;
  password: string;
}

interface Response {
  user: {
    email: string;
    name: string;
  },
  token: string;
  refreshToken: string;
}

@injectable()
export default class AuthenticateUserUseCase {
  constructor(@inject("UsersRepository") private usersRepository: UsersRepository,
    @inject("UsersTokensRepository") private usersTokensRepository: UsersTokensRepository,
    @inject("DateProvider") private dateProvider: DateProvider
  ) { }

  async execute({ email, password }: Request): Promise<Response> {

    const user = await this.findUserByEmail(email);
    await this.checkPasswordMatch(password, user.password);

    const token = this.generateToken(user.id);
    const refreshToken = this.generateRefreshToken(user);

    await this.saveRefreshToken(refreshToken, user.id);

    return {
      token,
      user: {
        name: user.name,
        email
      },
      refreshToken
    }
  }

  private generateRefreshToken({ id, email }: User) {
    return sign({ email }, auth.secretRefreshToken, {
      subject: id,
      expiresIn: auth.expiresInRefreshToken,
    });
  }
  private generateToken(subject: string) {
    return sign({}, auth.secretToken, {
      subject,
      expiresIn: auth.expiresInToken
    });
  }

  private refreshTokenExpiresDate() {
    return this.dateProvider.addDays(
      auth.expiresRefreshTokenDays
    );
  }

  private async findUserByEmail(email: string) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email or password incorrect!", 401);
    }

    return user;
  }

  private async checkPasswordMatch(password: string, userPassword: string) {

    const passwordMatch = await compare(password, userPassword);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect!", 401);
    }
  }

  private async saveRefreshToken(refreshToken: string, userId: string) {
    await this.usersTokensRepository.create({
      userId,
      refreshToken,
      expiresDate: this.refreshTokenExpiresDate(),
    })
  }

}
