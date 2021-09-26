import { Request, Response } from "express";
import { container } from "tsyringe";
import { DevolutionRentalUseCase } from "./DevolutionREntalUseCase";

export class DevolutionRentalController {

  async handle(request: Request, response: Response, next): Promise<Response> {
    const { id } = request.params;

    const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase);
    try {
      const rental = await devolutionRentalUseCase.execute({ id });

      return response.json(rental);
    } catch (e) {
      next(e)
    }
  }
}
