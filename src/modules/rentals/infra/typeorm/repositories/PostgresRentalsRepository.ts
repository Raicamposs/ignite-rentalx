import { CreateRentalDTO } from "@modules/rentals/dtos/CreateRentalDTO";
import { RentalsRepository } from "@modules/rentals/repositories/RentalsRepository";
import { getRepository, IsNull, Repository } from "typeorm";
import { Rental } from "../entities/Rental";

export class PostgresRentalsRepository implements RentalsRepository {

  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  findById(id: string): Promise<Rental> {
    return this.repository.findOne({ id });
  }

  findOpenRentalByCar(carId: string): Promise<Rental> {
    return this.repository.findOne({ carId, endDate: IsNull() });
  }

  findOpenRentalByUser(userId: string): Promise<Rental> {
    return this.repository.findOne({ userId, endDate: IsNull() });
  }

  create({ userId, carId, expectedReturnDate, id, endDate, total }: CreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({ userId, carId, expectedReturnDate, id, endDate, total });
    return this.repository.save(rental);
  }

}