import { CreateUserTokenDTO } from "@modules/accounts/dtos/CreateUserTokenDTO";
import { UsersTokensRepository } from "@modules/accounts/repositories/UsersTokensRepository";
import { getRepository, Repository } from "typeorm";
import { UserTokens } from "../entities/UserTokens";

class PostgresUsersTokensRepository implements UsersTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }

  async create({
    expiresDate,
    refreshToken,
    userId,
  }: CreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.create({
      expiresDate,
      refreshToken,
      userId,
    });

    await this.repository.save(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<UserTokens> {
    const usersTokens = await this.repository.findOne({
      userId,
      refreshToken,
    });
    return usersTokens;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findByRefreshToken(refreshToken: string): Promise<UserTokens> {
    const userToken = await this.repository.findOne({ refreshToken });

    return userToken;
  }
}

export { PostgresUsersTokensRepository };

