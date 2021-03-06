import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCarUseCase } from "./CreateCarUseCase";


export class CreateCarController {
  constructor() { }

  async handle(request: Request, response: Response, next): Promise<Response> {
    const {
      name,
      description,
      licensePlate,
      dailyRate,
      fineAmount,
      brand,
      categoryId
    } = request.body;

    const createCarUseCase = container.resolve(CreateCarUseCase);
    try {
      const car = await createCarUseCase.execute({
        name,
        description,
        licensePlate,
        dailyRate,
        fineAmount,
        brand,
        categoryId
      });

      return response.status(201).send(car);

    } catch (e) {
      next(e)
    }
  }


}
