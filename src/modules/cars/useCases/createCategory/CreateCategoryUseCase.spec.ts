import { AppError } from "@errors/AppErros";
import { CategoriesRepository } from "@modules/cars/repositories/CategoriesRepository";
import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import CreateCategoryUseCase from "./CreateCategoryUseCase";

let repository: CategoriesRepository;
let createCategoryUseCase: CreateCategoryUseCase;

describe("Create category", () => {

  beforeEach(() => {
    repository = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(repository);
  })
  it("Should be able to create a new category", async () => {
    const category = {
      name: 'Category Test',
      description: 'Category test description',
    };

    await createCategoryUseCase.execute(category);
    const categoryCreated = await repository.findByName(category.name);

    expect(categoryCreated).toHaveProperty('id');
  })
  it("Should not be able to create a new category with name exists", async () => {
    expect(async () => {
      const category = {
        name: 'Category Test',
        description: 'Category test description',
      };

      await createCategoryUseCase.execute(category);
      await createCategoryUseCase.execute(category);
    }).rejects.toBeInstanceOf(AppError);
  })
})