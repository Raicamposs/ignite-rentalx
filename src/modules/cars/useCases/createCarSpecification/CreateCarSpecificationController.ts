import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateSpecificationCarUseCase } from "./CreateCarSpecificationUseCase";


export class CreateSpecificationCarController {
  constructor() { }

  async handle(request: Request, response: Response, next): Promise<Response> {
    const { id } = request.params;
    const { specificationsId } = request.body;

    const createCarUseCase = container.resolve(CreateSpecificationCarUseCase);
    try {
      const car = await createCarUseCase.execute({ carId: id, specificationsId });

      return response.json(car);
    } catch (e) {
      next(e)
    }
  }
}
