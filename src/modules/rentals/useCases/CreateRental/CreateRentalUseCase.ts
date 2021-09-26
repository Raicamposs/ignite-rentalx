import { CarsRepository } from "@modules/cars/repositories/CarRepository";
import { RentalsRepository } from "@modules/rentals/repositories/RentalsRepository";
import { DateProvider } from "@shared/container/providers/DateProvider/DateProvider";
import { AppError } from "@shared/errors/AppErros";
import { inject, injectable } from "tsyringe";
import { Rental } from './../../infra/typeorm/entities/Rental';


interface Request {
  userId: string;
  carId: string;
  expectedReturnDate: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository") private rentalsRepository: RentalsRepository,
    @inject("DateProvider") private dateProvider: DateProvider,
    @inject("CarsRepository") private carsRepository: CarsRepository
  ) { }

  async execute({ userId, carId, expectedReturnDate }: Request): Promise<Rental> {
    const minimumDuration = 24;
    const rentalOpenToCar = await this.rentalsRepository.findOpenRentalByCar(carId);

    if (rentalOpenToCar) {
      throw new AppError("Car isn't available!");
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(userId);

    if (rentalOpenToUser) {
      throw new AppError("There's a rental in progress for user!");
    }

    const compare = this.dateProvider.compareInHours(new Date(), expectedReturnDate);

    if (compare < minimumDuration) {
      throw new AppError("Rental must have a minimum duration of 24 hours!");
    }

    const rental = await this.rentalsRepository.create({ userId, carId, expectedReturnDate });

    await this.carsRepository.updateAvailable(carId, false);

    return rental;
  }
}

export { CreateRentalUseCase };

