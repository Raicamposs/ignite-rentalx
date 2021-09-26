
import { CreateUserTokenDTO } from "../dtos/CreateUserTokenDTO";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

interface UsersTokensRepository {
  create({
    expiresDate,
    refreshToken,
    userId,
  }: CreateUserTokenDTO): Promise<UserTokens>;

  findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<UserTokens>;

  deleteById(id: string): Promise<void>;

  findByRefreshToken(refreshToken: string): Promise<UserTokens>;
}

export { UsersTokensRepository };

