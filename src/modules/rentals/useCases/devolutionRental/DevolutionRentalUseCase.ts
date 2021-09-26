import { Car } from "@modules/cars/infra/typeorm/entities/car";
import { CarsRepository } from "@modules/cars/repositories/CarRepository";
import { RentalsRepository } from "@modules/rentals/repositories/RentalsRepository";
import { DateProvider } from "@shared/container/providers/DateProvider/DateProvider";
import { AppError } from "@shared/errors/AppErros";
import { inject, injectable } from "tsyringe";
import { Rental } from '../../infra/typeorm/entities/Rental';


interface Request {
  id: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject("RentalsRepository") private rentalsRepository: RentalsRepository,
    @inject("DateProvider") private dateProvider: DateProvider,
    @inject("CarsRepository") private carsRepository: CarsRepository
  ) { }


  private valueDaily(rental: Rental, car: Car) {
    const minimumDaily = 1;

    let daily = this.dateProvider.compareInDays(rental.startDate, new Date());

    if (daily < minimumDaily) {
      daily = minimumDaily;
    }

    return (daily * car.dailyRate);
  }

  private valueLateFee(rental: Rental, car: Car) {
    const delay = this.dateProvider.compareInDays(new Date(), rental.expectedReturnDate);
    let lateFee = 0;

    if (delay > 0) {
      lateFee = delay * car.fineAmount;
    }

    return lateFee;
  }

  async execute({ id }: Request): Promise<Rental> {
    let rental = await this.rentalsRepository.findById(id);
    if (!rental) {
      throw new AppError("Rental does not exists!");
    }

    const car = await this.carsRepository.findById(rental.carId);

    rental.total = this.valueDaily(rental, car) + this.valueLateFee(rental, car);
    rental.endDate = new Date();
    rental = await this.rentalsRepository.create(rental);

    await this.carsRepository.updateAvailable(rental.carId, true);

    return rental;
  }
}

export { DevolutionRentalUseCase };

