import { CreateCarDTO } from '@modules/cars/dtos/CreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/car';
import { CarsRepository } from "@modules/cars/repositories/CarRepository";
import { getRepository, Repository } from "typeorm";



class PostgresCarsRepository implements CarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  findAvailable(query: { name?: string; brand?: string; categoryId?: string; }): Promise<Car[]> {
    const carQuery = this.repository.createQueryBuilder('c')
      .where("available = :available", { available: true });

    if (query.brand) {
      carQuery.andWhere("c.brand = :brand", { brand: query.brand });
    }

    if (query.name) {
      carQuery.andWhere("c.name = :name", { name: query.name });
    }

    if (query.categoryId) {
      carQuery.andWhere("c.categoryId = :categoryId", { categoryId: query.categoryId });
    }

    return carQuery.getMany();
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

