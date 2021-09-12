import { Request, Response } from "express";
import { container } from "tsyringe";
import AuthenticateUserUseCase from "./AuthenticateUserUseCase";


class AuthenticateUserController {
  constructor() { }

  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const useCase = container.resolve(AuthenticateUserUseCase);
    const token = await useCase.execute({
      email, password
    });

    return response.send(token);
  }
}

export { AuthenticateUserController };