import { CreateUSerDTO } from "@modules/accounts/dtos/UserCreateDTO";
import { getRepository, Repository } from "typeorm";
import { UsersRepository } from "../../../repositories/UsersRepository";
import { User } from "../entities/User";

class PostgresUsersRepository implements UsersRepository {

  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });
    return user;
  }
  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({ id });
    return user;
  }

  async create({ id, name, email, driver_license, password, avatar }: CreateUSerDTO): Promise<void> {
    const user = this.repository.create({
      id,
      avatar,
      name,
      email,
      driver_license,
      password,
    });
    await this.repository.save(user);
  }

}

export { PostgresUsersRepository };
