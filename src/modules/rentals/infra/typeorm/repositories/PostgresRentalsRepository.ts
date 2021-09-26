import { CreateRentalDTO } from "@modules/rentals/dtos/CreateRentalDTO";
import { RentalsRepository } from "@modules/rentals/repositories/RentalsRepository";
import { getRepository, Repository } from "typeorm";
import { Rental } from "../entities/Rental";

export class PostgresRentalsRepository implements RentalsRepository {

  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  findOpenRentalByCar(carId: string): Promise<Rental> {
    return this.repository.findOne({ carId });
  }

  findOpenRentalByUser(userId: string): Promise<Rental> {
    return this.repository.findOne({ userId });
  }

  create({ userId, carId, expectedReturnDate }: CreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({ userId, carId, expectedReturnDate });
    return this.repository.save(rental);
  }

}