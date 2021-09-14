
import { AppError } from "@errors/AppErros";
import { UsersRepository } from "@modules/accounts/repositories/UsersRepository";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";


interface Request {
  email: string;
  password: string;
}

interface Response {
  user: {
    email: string;
    name: string;
  },
  token: string;
}

@injectable()
export default class AuthenticateUserUseCase {
  constructor(@inject("UsersRepository") private usersRepository: UsersRepository) { }

  async execute({ email, password }: Request): Promise<Response> {

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email or password incorrect!", 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect!", 401);
    }

    const token = sign({}, "484f1c5d540e55294143e3d476346509", {
      subject: user.id,
      expiresIn: '1d'
    });

    return {
      token,
      user: {
        name: user.name,
        email
      }
    }
  }
}
