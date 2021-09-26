import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateUserUseCase from "./CreateUserUseCase";

export class CreateUserController {
  constructor() { }

  async handle(request: Request, response: Response, next): Promise<Response> {
    const { name, email, driver_license, password, } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);
    try {
      await createUserUseCase.execute({
        name,
        email,
        driver_license,
        password,
      });

      return response.status(201).send();
    } catch (e) {
      next(e)
    }
  }
}
