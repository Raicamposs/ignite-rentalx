import { PostgresCategoriesRepository } from "../../repositories/implementations/postgres/PostgresCategoriesRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import CreateCategoryUseCase from "./CreateCategoryUseCase";

export default () => {
  const categoriesRepository = new PostgresCategoriesRepository();

  const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);

  const createCategoryController = new CreateCategoryController(
    createCategoryUseCase
  );

  return createCategoryController
};

