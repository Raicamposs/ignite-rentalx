import { Request, Response } from "express";
import { container } from "tsyringe";
import ListCategoriesUseCase from "./ListCategoriesUseCase";

export class ListCategoriesController {
  constructor() { }

  async handle(_: Request, response: Response, next): Promise<Response> {
    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);
    try {
      const categories = await listCategoriesUseCase.execute();
      return response.json(categories);
    } catch (e) {
      next(e)
    }
  }
}
