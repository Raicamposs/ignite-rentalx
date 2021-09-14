import { CreateUSerDTO } from "../dtos/UserCreateDTO";
import { User } from "../entities/User";


interface UsersRepository {
  create(data: CreateUSerDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}

export { UsersRepository };
