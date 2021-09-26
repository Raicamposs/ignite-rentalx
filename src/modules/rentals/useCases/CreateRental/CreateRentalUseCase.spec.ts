import { CarsRepository } from "@modules/cars/repositories/CarRepository";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { RentalsRepository } from "@modules/rentals/repositories/RentalsRepository";
import { DateProvider } from "@shared/container/providers/DateProvider/DateProvider";
import { AppError } from "@shared/errors/AppErros";
import { DayJsProvider } from './../../../../shared/container/providers/DateProvider/implementations/DayJsProvider';
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let repository: RentalsRepository;
let repositoryCar: CarsRepository;
let dateProvider: DateProvider;

let expectedReturnDateDefault: Date = (() => {
  var result = new Date();
  result.setDate(result.getDate() + 2);
  return result;
})();


const createCar = async () => {
  const { id } = await repositoryCar.create({
    name: 'Car Test',
    description: 'Car description',
    licensePlate: 'ABC-1234',
    dailyRate: 100,
    fineAmount: 60,
    brand: 'Brand',
    categoryId: 'category',
  })
  return id;
}

describe("Create Rental", () => {

  beforeEach(async () => {
    repository = new RentalsRepositoryInMemory();
    repositoryCar = new CarsRepositoryInMemory();
    dateProvider = new DayJsProvider();
    createRentalUseCase = new CreateRentalUseCase(repository, dateProvider, repositoryCar);
    ;
  })


  it("Should to be able to create a new rental", async () => {

    const rental = await createRentalUseCase.execute({
      carId: await createCar(),
      userId: 'any',
      expectedReturnDate: expectedReturnDateDefault
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('startDate');
    expect(rental).toHaveProperty('createdAt');
    expect(rental).toHaveProperty('updatedAt');
  })

  it("Should not to be able to create a new rental if there is another open to the same user", async () => {
    await createRentalUseCase.execute({
      carId: await createCar(),
      userId: 'any_other',
      expectedReturnDate: expectedReturnDateDefault
    });

    expect(async () => createRentalUseCase.execute({
      carId: await createCar(),
      userId: 'any_other',
      expectedReturnDate: expectedReturnDateDefault
    })).rejects.toBeInstanceOf(AppError);
  })

  it("Should not to be able to create a new rental if there is another open to the same car", async () => {
    const carId = await createCar();
    await createRentalUseCase.execute({
      carId,
      userId: '5',
      expectedReturnDate: expectedReturnDateDefault
    });

    expect(async () => createRentalUseCase.execute({
      carId,
      userId: '6',
      expectedReturnDate: expectedReturnDateDefault
    })).rejects.toBeInstanceOf(AppError);
  })

  it("The rental must have a minimum duration of 24 hours", async () => {
    expect(async () => createRentalUseCase.execute({
      carId: await createCar(),
      userId: '6',
      expectedReturnDate: new Date()
    })).rejects.toBeInstanceOf(AppError);
  })

})