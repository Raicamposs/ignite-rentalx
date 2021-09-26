import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { RentalsRepository } from "@modules/rentals/repositories/RentalsRepository";
import { DateProvider } from "@shared/container/providers/DateProvider/DateProvider";
import { AppError } from "@shared/errors/AppErros";
import { DayJsProvider } from './../../../../shared/container/providers/DateProvider/implementations/DayJsProvider';
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let repository: RentalsRepository;
let dateProvider: DateProvider;

let expectedReturnDateDefault: Date = (() => {
  var result = new Date();
  result.setDate(result.getDate() + 2);
  return result;
})();


describe("Create Rental", () => {

  beforeEach(() => {
    repository = new RentalsRepositoryInMemory();
    dateProvider = new DayJsProvider();
    createRentalUseCase = new CreateRentalUseCase(repository, dateProvider);
  })


  it("Should to be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      carId: 'any',
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
      carId: '1',
      userId: 'any_other',
      expectedReturnDate: expectedReturnDateDefault
    });

    expect(async () => createRentalUseCase.execute({
      carId: '2',
      userId: 'any_other',
      expectedReturnDate: expectedReturnDateDefault
    })).rejects.toBeInstanceOf(AppError);
  })

  it("Should not to be able to create a new rental if there is another open to the same car", async () => {
    await createRentalUseCase.execute({
      carId: 'any_other',
      userId: '5',
      expectedReturnDate: expectedReturnDateDefault
    });

    expect(async () => createRentalUseCase.execute({
      carId: 'any_other',
      userId: '6',
      expectedReturnDate: expectedReturnDateDefault
    })).rejects.toBeInstanceOf(AppError);
  })

  it("The rental must have a minimum duration of 24 hours", async () => {
    expect(async () => createRentalUseCase.execute({
      carId: 'any_other',
      userId: '6',
      expectedReturnDate: new Date()
    })).rejects.toBeInstanceOf(AppError);
  })

})