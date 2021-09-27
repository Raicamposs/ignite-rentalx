
import { CreateUSerDTO } from "@modules/accounts/dtos/UserCreateDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { UsersRepository } from "@modules/accounts/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/accounts/repositories/UsersTokensRepository";
import { DateProvider } from "@shared/container/providers/DateProvider/DateProvider";
import { DayJsProvider } from "@shared/container/providers/DateProvider/implementations/DayJsProvider";
import { AppError } from "@shared/errors/AppErros";
import CreateUserUseCase from "../createUser/CreateUserUseCase";
import AuthenticateUserUseCase from "./AuthenticateUserUseCase";



describe("Authenticate User", () => {

  let repository: UsersRepository;
  let usersTokensRepository: UsersTokensRepository;
  let authenticateUserUseCase: AuthenticateUserUseCase;
  let createUserUseCase: CreateUserUseCase;
  let dateProvider: DateProvider;

  beforeAll(() => {
    dateProvider = new DayJsProvider();
  })

  beforeEach(() => {
    repository = new UsersRepositoryInMemory();
    usersTokensRepository = new UsersTokensRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(repository, usersTokensRepository, dateProvider);
    createUserUseCase = new CreateUserUseCase(repository);
  })
  it("Should be able to authenticate an user", async () => {

    const user: CreateUSerDTO = {
      name: 'User test',
      email: 'teste@email.com',
      driver_license: '99999999',
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
      driver_license: '99999999',
      password: 'password',
    }

    expect(async () => {
      await createUserUseCase.execute(user);
      await authenticateUserUseCase.execute({ email: user.email, password: 'any' });
    }).rejects.toBeInstanceOf(AppError);
  })
})