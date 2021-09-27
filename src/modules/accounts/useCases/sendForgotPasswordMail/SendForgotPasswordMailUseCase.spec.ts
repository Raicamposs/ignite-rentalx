import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DateProvider } from "@shared/container/providers/DateProvider/DateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppErros";
import { DayJsProvider } from './../../../../shared/container/providers/DateProvider/implementations/DayJsProvider';
import SendForgotPasswordMailUseCase from "./SendForgotPasswordMailUseCase";




describe("Send Forgot Mail", () => {

  let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
  let usersRepositoryInMemory: UsersRepositoryInMemory;
  let dateProvider: DateProvider;
  let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
  let mailProvider: MailProviderInMemory;

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayJsProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("should be able to send a forgot password mail to user", async () => {

    const spy = jest.spyOn(mailProvider, "sendMail");

    const email = "avzonbop@ospo.pr";
    await usersRepositoryInMemory.create({
      driver_license: "664168",
      email,
      name: "Blanche Curry",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute(email);

    expect(spy).toHaveBeenCalled();
  });

  it("should not be able to send an email if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("ka@uj.gr")
    ).rejects.toEqual(new AppError("User does not exists!"));
  });

  it("should be able to create an users token", async () => {
    const spy = jest.spyOn(usersTokensRepositoryInMemory, "create");

    usersRepositoryInMemory.create({
      driver_license: "787330",
      email: "abome@regrog.ee",
      name: "Leon Perkins",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("abome@regrog.ee");

    expect(spy).toBeCalled();
  });
});