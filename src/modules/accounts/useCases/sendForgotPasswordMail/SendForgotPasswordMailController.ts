import { Request, Response } from "express";
import { container } from "tsyringe";
import SendForgotPasswordMailUseCase from "./SendForgotPasswordMailUseCase";


class SendForgotPasswordMailController {
  constructor() { }

  async handle(request: Request, response: Response, next): Promise<Response> {
    const { email } = request.body;
    try {
      const sendForgotPasswordMailUseCase = container.resolve(SendForgotPasswordMailUseCase);
      await sendForgotPasswordMailUseCase.execute(email);
      return response.send();
    } catch (e) {
      next(e)
    }
  }
}

export { SendForgotPasswordMailController };

