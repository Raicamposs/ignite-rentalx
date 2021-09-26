import { CreateRentalDTO } from "@modules/rentals/dtos/CreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { RentalsRepository } from "../RentalsRepository";


class RentalsRepositoryInMemory implements RentalsRepository {
  private rentals: Rental[];

  constructor() {
    this.rentals = [];
  }

  async create({ userId, carId, expectedReturnDate }: CreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      userId,
      carId,
      expectedReturnDate,
      startDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.rentals.push(rental);
    return rental;
  }

  async findOpenRentalByCar(carId: string): Promise<Rental> {
    return this.rentals.find((rental) => rental.carId === carId && !rental.endDate);
  }

  async findOpenRentalByUser(userId: string): Promise<Rental> {
    return this.rentals.find((rental) => rental.userId === userId && !rental.endDate);
  }
}

export { RentalsRepositoryInMemory };

