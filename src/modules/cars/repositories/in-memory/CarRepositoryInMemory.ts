

import { CreateCarDTO } from "@modules/cars/dtos/CreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/car";
import { v4 as uuidV4 } from "uuid";
import { CarsRepository } from "../CarRepository";

class CarsRepositoryInMemory implements CarsRepository {
  private cars: Car[];

  constructor() {
    this.cars = [];
  }

  findById(id: string): Promise<Car> {
    return new Promise((resolve, _) => {
      resolve(this.cars.find((car) => car.id === id));
    });
  }


  async findAvailable(query: { name?: string; brand?: string; categoryId?: string; }): Promise<Car[]> {

    const { name, brand, categoryId } = query;

    const carsAvailable = this.cars
      .filter((car) => car.available === true)
      .filter((car) => !categoryId || car.categoryId === categoryId)
      .filter((car) => !brand || car.brand === brand)
      .filter((car) => !name || car.name === name);

    return carsAvailable;
  }

  findByLicensePlate(licensePlate: string): Promise<Car> {
    return new Promise((resolve, _) => {
      resolve(this.cars.find((car) => car.licensePlate === licensePlate));
    });
  }

  create({ name, description, licensePlate, dailyRate, fineAmount, brand, categoryId, specifications }: CreateCarDTO): Promise<Car> {
    return new Promise((resolve, _) => {
      const car = new Car();
      Object.assign(car, { name, description, licensePlate, dailyRate, fineAmount, brand, categoryId, specifications });

      car.available = true;
      car.createdAt = new Date();
      car.id = uuidV4();

      this.cars.push(car);
      resolve(car);
    });
  }


}

export { CarsRepositoryInMemory };

