import { CreateCarDTO } from '@modules/cars/dtos/CreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/car';
import { CarsRepository } from "@modules/cars/repositories/CarRepository";
import { getRepository, Repository } from "typeorm";



class PostgresCarsRepository implements CarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }
  create({ name, description, licensePlate, dailyRate, fineAmount, brand, categoryId }: CreateCarDTO): Promise<Car> {
    const car = this.repository.create({ name, description, licensePlate, dailyRate, fineAmount, brand, categoryId });
    return this.repository.save(car);
  }

  findByLicensePlate(licensePlate: string): Promise<Car> {
    return this.repository.findOne({ licensePlate });
  }
}

export { PostgresCarsRepository };

