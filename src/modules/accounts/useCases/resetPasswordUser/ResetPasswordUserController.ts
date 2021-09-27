import { Request, Response } from "express";
import { container } from "tsyringe";
import { ResetPasswordUserUseCase } from "./ResetPasswordUserUseCase";


class ResetPasswordUserController {
  async handle(request: Request, response: Response, next): Promise<Response> {
    const { token } = request.query;
    const { password } = request.body;

    try {
      const resetPasswordUserUseCase = container.resolve(
        ResetPasswordUserUseCase
      );

      await resetPasswordUserUseCase.execute({ token: String(token), password });

      return response.send();
    } catch (error) {
      next(error);
    }
  }
}

export { ResetPasswordUserController };

