import { Category } from "../../model/category";
import { CategoriesRepository } from "../../repositories/CategoriesRepository";

export default class ListCategoriesUseCase {
  constructor(private categoriesRepository: CategoriesRepository) { }

  execute(): Category[] {
    return this.categoriesRepository.list();
  }
}
