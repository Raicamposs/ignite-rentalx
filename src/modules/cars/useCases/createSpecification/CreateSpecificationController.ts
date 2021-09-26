import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateSpecificationUseCase from "./CreateSpecificationUseCase";

export class CreateSpecificationController {
  constructor() { }

  async handle(request: Request, response: Response, next): Promise<Response> {
    const { name, description } = request.body;

    const createSpecificationUseCase = container.resolve(CreateSpecificationUseCase);
    try {
      await createSpecificationUseCase.execute({
        name,
        description,
      });

      return response.status(201).send();

    } catch (e) {
      next(e)
    }
  }
}
