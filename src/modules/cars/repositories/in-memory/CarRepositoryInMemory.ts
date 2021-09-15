

import { CreateCarDTO } from "@modules/cars/dtos/CreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/car";
import { CarsRepository } from "../CarRepository";
import { v4 as uuidV4 } from "uuid";

class CarsRepositoryInMemory implements CarsRepository {
  private cars: Car[];

  constructor() {
    this.cars = [];
  }

  findByLicensePlate(licensePlate: string): Promise<Car> {
    return new Promise((resolve, _) => {
      resolve(this.cars.find((category) => category.licensePlate === licensePlate));
    });
  }

  create({ name, description, licensePlate, dailyRate, fineAmount, brand, categoryId }: CreateCarDTO): Promise<Car> {
    return new Promise((resolve, _) => {
      const car = new Car();
      Object.assign(car, { name, description, licensePlate, dailyRate, fineAmount, brand, categoryId });

      car.available = true;
      car.createdAt = new Date();
      car.id = uuidV4();

      this.cars.push(car);
      resolve(car);
    });
  }


}

export { CarsRepositoryInMemory };

