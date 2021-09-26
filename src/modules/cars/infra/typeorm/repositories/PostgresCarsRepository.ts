import { CreateCarDTO } from '@modules/cars/dtos/CreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/car';
import { CarsRepository } from "@modules/cars/repositories/CarRepository";
import { getRepository, Repository } from "typeorm";



class PostgresCarsRepository implements CarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }


  findById(id: string): Promise<Car> {
    return this.repository.findOne({ id });
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

  create({ id, name, description, licensePlate, dailyRate, fineAmount, brand, categoryId, specifications }: CreateCarDTO): Promise<Car> {
    const car = this.repository.create({ id, name, description, licensePlate, dailyRate, fineAmount, brand, categoryId, specifications });
    return this.repository.save(car);
  }

  findByLicensePlate(licensePlate: string): Promise<Car> {
    return this.repository.findOne({ licensePlate });
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    await this.repository.createQueryBuilder()
      .update()
      .set({ available })
      .where("id = :id")
      .setParameter("id", id)
      .execute();
  }
}

export { PostgresCarsRepository };

