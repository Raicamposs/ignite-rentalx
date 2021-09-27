import { UsersRepository } from "@modules/accounts/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/accounts/repositories/UsersTokensRepository";
import { DateProvider } from "@shared/container/providers/DateProvider/DateProvider";
import { MailProvider } from "@shared/container/providers/MailProvider/MailProvider";
import { AppError } from "@shared/errors/AppErros";
import { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";

@injectable()
export default class SendForgotPasswordMailUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: UsersRepository,
    @inject("UsersTokensRepository") private usersTokensRepository: UsersTokensRepository,
    @inject("DateProvider") private dateProvider: DateProvider,
    @inject("MailProvider") private mailProvider: MailProvider
  ) { }


  private async findUserByEmail(email: string) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User does not exists!");
    }

    return user;
  }

  private get tokenExpiresDate() {
    return this.dateProvider.addDays(1);
  }

  private get templatePath() {
    return resolve(
      __dirname,
      "..",
      "..",
      "views",
      "emails",
      "forgotPassword.hbs"
    );
  }

  private async saveToken(token: string, userId: string) {
    await this.usersTokensRepository.create({
      userId,
      refreshToken: token,
      expiresDate: this.tokenExpiresDate
    })
  }

  async execute(email: string): Promise<void> {
    const user = await this.findUserByEmail(email);
    const token = uuidV4();

    await this.saveToken(token, user.id);

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`,
    };

    this.mailProvider.sendMail(
      email,
      "Recuperação de senha",
      variables,
      this.templatePath
    );
  }
}
