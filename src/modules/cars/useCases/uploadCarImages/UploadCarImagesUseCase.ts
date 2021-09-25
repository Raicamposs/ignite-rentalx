import { CarImageRepository } from "@modules/cars/repositories/CarImageRepository";
import { CarsRepository } from "@modules/cars/repositories/CarRepository";
import { AppError } from "@shared/errors/AppErros";
import { inject, injectable } from "tsyringe";


interface Request {
  carId: string;
  imagesName: string[];
}

@injectable()
export class UploadCarImagesUseCase {
  constructor(
    @inject("CarsRepository") private carsRepository: CarsRepository,
    @inject("CarImageRepository") private carImageRepository: CarImageRepository
  ) { }

  async execute({ carId, imagesName }: Request): Promise<void> {
    let carExists = await this.carsRepository.findById(carId);

    if (!carExists) {
      throw new AppError("Car does not exists!");
    }

    await Promise.all(imagesName.map(imageName => this.carImageRepository.create(carId, imageName)));
  }
}
