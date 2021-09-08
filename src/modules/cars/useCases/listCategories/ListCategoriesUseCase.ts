import { Category } from "../../entities/category";
import { CategoriesRepository } from "../../repositories/CategoriesRepository";

export default class ListCategoriesUseCase {
  constructor(private categoriesRepository: CategoriesRepository) { }

  async execute(): Promise<Category[]> {
    return this.categoriesRepository.list();
  }
}
