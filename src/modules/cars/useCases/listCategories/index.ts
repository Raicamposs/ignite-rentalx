import { PostgresCategoriesRepository } from "../../repositories/implementations/postgres/PostgresCategoriesRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import ListCategoriesUseCase from "./ListCategoriesUseCase";

export default () => {
  const categoriesRepository = new PostgresCategoriesRepository();

  const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository);

  const listCategoriesController = new ListCategoriesController(
    listCategoriesUseCase
  );

  return listCategoriesController
};

