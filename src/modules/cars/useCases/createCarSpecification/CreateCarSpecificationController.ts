import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateSpecificationCarUseCase } from "./CreateCarSpecificationUseCase";


export class CreateSpecificationCarController {
  constructor() { }

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { specificationsId } = request.body;

    const createCarUseCase = container.resolve(CreateSpecificationCarUseCase);
    const car = await createCarUseCase.execute({ carId: id, specificationsId });

    return response.json(car);
  }
}
