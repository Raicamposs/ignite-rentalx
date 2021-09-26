import { CreateRentalDTO } from "@modules/rentals/dtos/CreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { RentalsRepository } from "../RentalsRepository";


class RentalsRepositoryInMemory implements RentalsRepository {
  private rentals: Rental[];

  constructor() {
    this.rentals = [];
  }



  async create({ userId, carId, expectedReturnDate, id, endDate, total }: CreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      id,
      total,
      endDate,
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

  async findById(id: string): Promise<Rental> {
    return this.rentals.find((rental) => rental.id === id);
  }

  async findOpenRentalByCar(carId: string): Promise<Rental> {
    return this.rentals.find((rental) => rental.carId === carId && !rental.endDate);
  }

  async findOpenRentalByUser(userId: string): Promise<Rental> {
    return this.rentals.find((rental) => rental.userId === userId && !rental.endDate);
  }

  async findByUserId(userId: string): Promise<Rental[]> {
    return this.rentals.filter((rental) => rental.userId === userId);
  }

}

export { RentalsRepositoryInMemory };

