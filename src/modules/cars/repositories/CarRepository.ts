import { CreateCarDTO } from "../dtos/CreateCarDTO";
import { Car } from "../infra/typeorm/entities/car";

interface CarsRepository {
  create(data: CreateCarDTO): Promise<Car>;
  findById(id: string): Promise<Car | undefined>;
  findByLicensePlate(licensePlate: string): Promise<Car | undefined>;
  updateAvailable(id: string, available: boolean): Promise<void>;
  findAvailable(query: {
    name?: string;
    brand?: string;
    categoryId?: string;
  }): Promise<Car[]>;
}

export { CarsRepository };

