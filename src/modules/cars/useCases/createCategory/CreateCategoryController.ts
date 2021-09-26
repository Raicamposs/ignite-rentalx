import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateCategoryUseCase from "./CreateCategoryUseCase";

export class CreateCategoryController {
  constructor() { }

  async handle(request: Request, response: Response, next): Promise<Response> {
    try {
      const { name, description } = request.body;
      const createCategoryUseCase = container.resolve(CreateCategoryUseCase);
      await createCategoryUseCase.execute({
        name,
        description,
      });

      return response.status(201).send();
    } catch (e) {
      next(e)
    }
  }
}
