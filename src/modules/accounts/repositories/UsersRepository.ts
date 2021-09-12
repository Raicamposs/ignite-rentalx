import { User } from './../entities/User';
import { CreateUSerDTO } from "../dtos/UserCreateDTO";

interface UsersRepository {
  create(data: CreateUSerDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(email: string): Promise<User>;
}

export { UsersRepository };
