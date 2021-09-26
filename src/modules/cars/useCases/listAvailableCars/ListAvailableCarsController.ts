import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsCarUseCase";


export class ListAvailableCarsController {
  constructor() { }

  async handle(request: Request, response: Response, next): Promise<Response> {

    const listAvailableCarsUseCase = container.resolve(ListAvailableCarsUseCase);
    const { name, brand, categoryId } = request.query;
    try {
      const cars = await listAvailableCarsUseCase.execute({
        name: name as string,
        brand: brand as string,
        categoryId: categoryId as string,
      });

      return response.json(cars);
    } catch (e) {
      next(e)
    }
  }
}
