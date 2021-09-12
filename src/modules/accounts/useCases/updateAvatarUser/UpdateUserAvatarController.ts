import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

export class UpdateUserAvatarController {
  constructor() { }

  async handle(request: Request, response: Response): Promise<Response> {

    const { file: { filename: pathFile }, user: { id: userId } } = request;
    await container.resolve(UpdateUserAvatarUseCase).execute({
      userId,
      pathFile
    });

    return response.status(204).send();
  }
}
