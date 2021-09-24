import { CarsRepository } from "@modules/cars/repositories/CarRepository";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsCarUseCase";


let createCarUseCase: ListAvailableCarsUseCase;
let repository: CarsRepository;

describe("List Available Cars", () => {

  beforeEach(() => {
    repository = new CarsRepositoryInMemory();
    createCarUseCase = new ListAvailableCarsUseCase(repository);
  })

  it("Should be able to list all available cars", async () => {

    const car = await repository.create({
      "name": "Car 1",
      "description": "Car 1",
      "licensePlate": "ABC-1234",
      "dailyRate": 100,
      "fineAmount": 60,
      "brand": "car_brand",
      "categoryId": "categoryId"
    })

    const cars = await createCarUseCase.execute({});
    expect(cars).toEqual([car]);

  })
  it("Should be able to list all available by name", async () => {
    const car = await repository.create({
      "name": "Car 1",
      "description": "Car_test",
      "licensePlate": "ABC-1234",
      "dailyRate": 100,
      "fineAmount": 60,
      "brand": "car_brand",
      "categoryId": "categoryId"
    })

    const cars = await createCarUseCase.execute({});
    expect(cars).toEqual([car]);
  })
  it("Should be able to list all available by category name", async () => {
    const car = await repository.create({
      "name": "Car 1",
      "description": "Car 1",
      "licensePlate": "ABC-1234",
      "dailyRate": 100,
      "fineAmount": 60,
      "brand": "car_brand",
      "categoryId": "categoryId_test"
    })

    const cars = await createCarUseCase.execute({ categoryId: car.categoryId });
    expect(cars).toEqual([car]);
  })

  it("Should be able to list all available by brand name", async () => {
    const car = await repository.create({
      "name": "Car 1",
      "description": "Car 1",
      "licensePlate": "ABC-1234",
      "dailyRate": 100,
      "fineAmount": 60,
      "brand": "car_brand_test",
      "categoryId": "categoryId"
    })

    const cars = await createCarUseCase.execute({ brand: car.brand });
    expect(cars).toEqual([car]);
  })


})