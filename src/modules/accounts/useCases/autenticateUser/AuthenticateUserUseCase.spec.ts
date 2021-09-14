
import { AppError } from "@errors/AppErros";
import { CreateUSerDTO } from "@modules/accounts/dtos/UserCreateDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import { UsersRepository } from "@modules/accounts/repositories/UsersRepository";
import CreateUserUseCase from "../createUser/CreateUserUseCase";
import AuthenticateUserUseCase from "./AuthenticateUserUseCase";

let repository: UsersRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {

  beforeEach(() => {
    repository = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(repository);
    createUserUseCase = new CreateUserUseCase(repository);
  })
  it("Should be able to authenticate an user", async () => {

    const user: CreateUSerDTO = {
      name: 'User test',
      email: 'teste@email.com',
      driver_licence: '99999999',
      password: 'password',
    }
    await createUserUseCase.execute(user);
    const result = await authenticateUserUseCase.execute({ email: user.email, password: user.password });
    expect(result).toHaveProperty('token');
    expect(result.token).not.toBeNull();
  })
  it("Should not be able to authenticate an user with incorrect email", async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({ email: 'any', password: 'any' });
    }).rejects.toBeInstanceOf(AppError);
  })
  it("Should not be able to authenticate an user with incorrect password", async () => {

    const user: CreateUSerDTO = {
      name: 'User test',
      email: 'teste@email.com',
      driver_licence: '99999999',
      password: 'password',
    }

    expect(async () => {
      await createUserUseCase.execute(user);
      await authenticateUserUseCase.execute({ email: user.email, password: 'any' });
    }).rejects.toBeInstanceOf(AppError);
  })
})