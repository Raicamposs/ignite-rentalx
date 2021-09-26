import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListRentalsByUserUseCase } from "./ListRentalsByUserUseCase";

export class ListRentalsByUserController {

  async handle(request: Request, response: Response, next): Promise<Response> {
    const { id: userId } = request.user;

    const listRentalsByUserUseCase = container.resolve(ListRentalsByUserUseCase);
    try {
      const rentals = await listRentalsByUserUseCase.execute(userId);

      return response.json(rentals);
    } catch (e) {
      next(e)
    }
  }
}
