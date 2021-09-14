import { CreateUSerDTO } from "@modules/accounts/dtos/UserCreateDTO";
import { User } from "@modules/accounts/entities/User";
import { UsersRepository } from "../UsersRepository";





class UsersRepositoryInMemory implements UsersRepository {
  private users: User[];

  constructor() { this.users = []; }

  create(data: CreateUSerDTO): Promise<void> {
    return new Promise((resolve, _) => {
      const user = new User();
      Object.assign(user, data);
      this.users.push(user);
      resolve();
    });
  }

  findByEmail(email: string): Promise<User> {
    return new Promise((resolve, _) => {
      resolve(this.users.find(
        (user) => user.email === email
      ));
    });
  }

  findById(id: string): Promise<User> {
    return new Promise((resolve, _) => {
      resolve(this.users.find(
        (user) => user.id === id
      ));
    });
  }
}

export { UsersRepositoryInMemory };

