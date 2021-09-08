import { inject, injectable } from "tsyringe";
import { Category } from "../../entities/category";
import { CategoriesRepository } from "../../repositories/CategoriesRepository";
@injectable()
export default class ListCategoriesUseCase {
  constructor(@inject("CategoriesRepository") private categoriesRepository: CategoriesRepository) { }

  async execute(): Promise<Category[]> {
    return this.categoriesRepository.list();
  }
}
