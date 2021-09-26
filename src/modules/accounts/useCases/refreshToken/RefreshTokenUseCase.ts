import auth from "@config/auth";
import { UsersTokensRepository } from "@modules/accounts/repositories/UsersTokensRepository";
import { DateProvider } from "@shared/container/providers/DateProvider/DateProvider";
import { AppError } from "@shared/errors/AppErros";
import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";



interface Payload {
  sub: string;
  email: string;
}

interface TokenResponse {
  token: string;
  refreshToken: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: UsersTokensRepository,
    @inject("DateProvider")
    private dateProvider: DateProvider
  ) { }

  async execute(token: string): Promise<TokenResponse> {
    const { email, sub: userId } = verify(token, auth.secretRefreshToken) as Payload;


    const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(
      userId,
      token
    );

    if (!userToken) {
      throw new AppError("Refresh Token does not exists!");
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const refreshToken = sign({ email }, auth.secretRefreshToken, {
      subject: userId,
      expiresIn: auth.expiresInRefreshToken,
    });

    const expiresDate = this.dateProvider.addDays(
      auth.expiresRefreshTokenDays
    );

    await this.usersTokensRepository.create({
      expiresDate,
      refreshToken,
      userId,
    });

    const newToken = sign({}, auth.secretToken, {
      subject: userId,
      expiresIn: auth.expiresInToken,
    });

    return {
      refreshToken,
      token: newToken,
    };
  }
}

export { RefreshTokenUseCase };

