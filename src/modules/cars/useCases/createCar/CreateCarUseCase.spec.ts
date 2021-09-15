import { CarsRepository } from "@modules/cars/repositories/CarRepository";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";
import { AppError } from "@shared/errors/AppErros";
import { CreateCarUseCase } from "./CreateCarUseCase";



let createCarUseCase: CreateCarUseCase;
let repository: CarsRepository;

describe("Create car", () => {

  beforeEach(() => {
    repository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(repository);
  })
  it("Should be able to create a new car", async () => {
    const carCreated = await createCarUseCase.execute({
      name: 'Car Test',
      description: 'Car description',
      licensePlate: 'ABC-1234',
      dailyRate: 100,
      fineAmount: 60,
      brand: 'Brand',
      categoryId: 'category',
    });

    expect(carCreated).toHaveProperty('id');
    expect(carCreated).toHaveProperty('available');
    expect(carCreated).toHaveProperty('createdAt');
  })

  it("Should be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: 'Car Test',
      description: 'Car description',
      licensePlate: 'ABC-1234',
      dailyRate: 100,
      fineAmount: 60,
      brand: 'Brand',
      categoryId: 'category',
    });

    expect(car.available).toBe(true);
  })

  it("Should not be able to create a new car with exists license plate", async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'Car 1',
        description: 'Car description',
        licensePlate: 'ABC-1234',
        dailyRate: 100,
        fineAmount: 60,
        brand: 'Brand',
        categoryId: 'category',
      });

      await createCarUseCase.execute({
        name: 'Car 2',
        description: 'Car description',
        licensePlate: 'ABC-1234',
        dailyRate: 100,
        fineAmount: 60,
        brand: 'Brand',
        categoryId: 'category',
      });
    }).rejects.toBeInstanceOf(AppError);
  })

})