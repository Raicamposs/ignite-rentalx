import { RentalsRepository } from "@modules/rentals/repositories/RentalsRepository";
import { inject, injectable } from "tsyringe";
import { Rental } from '../../infra/typeorm/entities/Rental';


@injectable()
class ListRentalsByUserUseCase {
  constructor(
    @inject("RentalsRepository") private rentalsRepository: RentalsRepository,
  ) { }

  async execute(userId: string): Promise<Rental[]> {
    return this.rentalsRepository.findByUserId(userId);
  }
}

export { ListRentalsByUserUseCase };

