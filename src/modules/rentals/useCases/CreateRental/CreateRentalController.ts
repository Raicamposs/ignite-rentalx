import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

export class CreateRentalController {

  async handle(request: Request, response: Response, next): Promise<Response> {
    const { id: userId } = request.user;
    const { carId, expectedReturnDate } = request.body;

    const createRentalUseCase = container.resolve(CreateRentalUseCase);
    try {
      const rental = await createRentalUseCase.execute({
        userId,
        carId,
        expectedReturnDate
      });

      return response.status(201).send(rental);
    } catch (e) {
      next(e)
    }
  }
}
