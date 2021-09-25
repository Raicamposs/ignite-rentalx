import { Car } from '@modules/cars/infra/typeorm/entities/car';
import { CarsRepository } from "@modules/cars/repositories/CarRepository";
import { SpecificationsRepository } from "@modules/cars/repositories/SpecificationsRepository";
import { AppError } from "@shared/errors/AppErros";
import { inject, injectable } from 'tsyringe';

interface Request {
  carId: string;
  specificationsId: string[];
}

@injectable()
class CreateSpecificationCarUseCase {
  constructor(
    @inject("CarsRepository") private carsRepository: CarsRepository,
    @inject("SpecificationsRepository") private specificationsRepository: SpecificationsRepository
  ) { }

  async execute({ carId, specificationsId }: Request): Promise<Car> {
    let carExists = await this.carsRepository.findById(carId);

    if (!carExists) {
      throw new AppError("Car does not exists!");
    }

    const specifications = await this.specificationsRepository.findByIds(specificationsId);

    carExists.specifications = specifications;
    carExists = await this.carsRepository.create(carExists);

    return carExists;
  }
}

export { CreateSpecificationCarUseCase };

