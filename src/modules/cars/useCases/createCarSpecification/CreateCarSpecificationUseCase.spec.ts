import { CarsRepository } from "@modules/cars/repositories/CarRepository";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { SpecificationsRepository } from "@modules/cars/repositories/SpecificationsRepository";
import { AppError } from './../../../../shared/errors/AppErros';
import { CreateSpecificationCarUseCase } from "./CreateCarSpecificationUseCase";



let createSpecificationCarUseCase: CreateSpecificationCarUseCase;
let carsRepository: CarsRepository;
let specificationsRepository: SpecificationsRepository;

describe("Create Car Specification", () => {

  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    specificationsRepository = new SpecificationsRepositoryInMemory();
    createSpecificationCarUseCase = new CreateSpecificationCarUseCase(carsRepository, specificationsRepository);
  })
  it("Should not be able to add a new specification on a non-existing car", async () => {
    const request = {
      carId: 'invalid_car',
      specificationsId: ['any']
    };

    expect(() => createSpecificationCarUseCase.execute(request)).rejects.toBeInstanceOf(AppError)
  });


  it("Should be able to add a new specification to the car", async () => {

    let car = await carsRepository.create({
      name: 'Car Test',
      description: 'Car description',
      licensePlate: 'ABC-1234',
      dailyRate: 100,
      fineAmount: 60,
      brand: 'Brand',
      categoryId: 'category',
    });

    const specification = await specificationsRepository.create({
      name: 'Specification Test',
      description: 'Specification test description',
    });


    const request = {
      carId: car.id,
      specificationsId: [specification.id]
    };

    car = await createSpecificationCarUseCase.execute(request);
    expect(car).toHaveProperty('specifications');
    expect(car.specifications.length).toBe(1);
    expect(car.specifications[0]).toBe(specification);
  });

})