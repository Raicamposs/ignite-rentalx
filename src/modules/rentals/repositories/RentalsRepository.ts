import { CreateRentalDTO } from "../dtos/CreateRentalDTO";
import { Rental } from "../infra/typeorm/entities/Rental";

interface RentalsRepository {
  findOpenRentalByCar(carId: string): Promise<Rental | undefined>;
  findOpenRentalByUser(userId: string): Promise<Rental | undefined>;
  create(rental: CreateRentalDTO): Promise<Rental>;
}

export { RentalsRepository };

