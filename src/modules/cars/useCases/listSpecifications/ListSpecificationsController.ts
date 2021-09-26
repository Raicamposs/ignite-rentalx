import { Request, Response } from "express";
import { container } from "tsyringe";
import ListSpecificationsUseCase from "./ListSpecificationsUseCase";

export class ListSpecificationsController {
  constructor() { }

  async handle(_: Request, response: Response, next): Promise<Response> {
    const listSpecificationsUseCase = container.resolve(ListSpecificationsUseCase);

    try {
      const specifications = await listSpecificationsUseCase.execute();
      return response.json(specifications);
    } catch (e) {
      next(e)
    }
  }
}
