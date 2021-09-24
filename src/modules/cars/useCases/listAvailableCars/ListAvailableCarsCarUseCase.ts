import { Car } from "@modules/cars/infra/typeorm/entities/car";
import { CarsRepository } from "@modules/cars/repositories/CarRepository";
import { inject, injectable } from 'tsyringe';


interface Request {
  name?: string;
  brand?: string;
  categoryId?: string;
}

@injectable()
class ListAvailableCarsUseCase {
  constructor(@inject("CarsRepository") private carsRepository: CarsRepository) { }

  async execute({ name, brand, categoryId }: Request): Promise<Car[]> {
    return this.carsRepository.findAvailable({ name, brand, categoryId });
  }
}

export { ListAvailableCarsUseCase };

