import { Repository, getRepository } from "typeorm";
import { Category } from "../../../cars/entities/category";
import { CreateUSerDTO } from "../../dtos/UserCreateDTO";
import { User } from "../../entities/User";
import { UsersRepository } from "../UsersRepository";

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

  async create({ id, name, email, driver_licence, password, avatar }: CreateUSerDTO): Promise<void> {
    const user = this.repository.create({
      id,
      avatar,
      name,
      email,
      driver_licence,
      password,
    });
    await this.repository.save(user);
  }

}

export { PostgresUsersRepository }