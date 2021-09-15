import { Car } from './../../infra/typeorm/entities/car';
import { CarsRepository } from "@modules/cars/repositories/CarRepository";
import { AppError } from "@shared/errors/AppErros";
import { inject, injectable } from 'tsyringe';

interface Request {
  name: string;
  description: string;
  licensePlate: string;
  dailyRate: number;
  fineAmount: number;
  brand: string;
  categoryId?: string;
}

@injectable()
class CreateCarUseCase {
  constructor(@inject("CarsRepository") private carsRepository: CarsRepository) { }

  async execute({ name, description, licensePlate, dailyRate, fineAmount, brand, categoryId }: Request): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(licensePlate);

    if (carAlreadyExists) {
      throw new AppError("Car Already exists!");
    }

    return this.carsRepository.create({
      name,
      description,
      licensePlate,
      dailyRate,
      fineAmount,
      brand,
      categoryId
    })
  }
}

export { CreateCarUseCase };

