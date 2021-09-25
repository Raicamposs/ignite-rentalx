import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { SpecificationsRepository } from "@modules/cars/repositories/SpecificationsRepository";
import { AppError } from "@shared/errors/AppErros";
import CreateSpecificationUseCase from "./CreateSpecificationUseCase";

let repository: SpecificationsRepository;
let createSpecificationUseCase: CreateSpecificationUseCase;

describe("Create specification", () => {

  beforeEach(() => {
    repository = new SpecificationsRepositoryInMemory();
    createSpecificationUseCase = new CreateSpecificationUseCase(repository);
  })
  it("Should be able to create a new specification", async () => {
    const specification = {
      name: 'specification Test',
      description: 'specification test description',
    };

    await createSpecificationUseCase.execute(specification);
    const specificationCreated = await repository.findByName(specification.name);

    expect(specificationCreated).toHaveProperty('id');
  })
  it("Should not be able to create a new specification with name exists", async () => {
    expect(async () => {
      const specification = {
        name: 'Specification Test',
        description: 'Specification test description',
      };

      await createSpecificationUseCase.execute(specification);
      await createSpecificationUseCase.execute(specification);
    }).rejects.toBeInstanceOf(AppError);
  })
})