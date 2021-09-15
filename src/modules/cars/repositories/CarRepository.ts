import { CreateCarDTO } from "../dtos/CreateCarDTO";
import { Car } from "../infra/typeorm/entities/car";

interface CarsRepository {
  create(data: CreateCarDTO): Promise<Car>;
  findByLicensePlate(licensePlate: string): Promise<Car | undefined>;
}

export { CarsRepository }