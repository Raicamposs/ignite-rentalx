
import { Category } from "@modules/cars/infra/typeorm/entities/category";
import { CategoriesRepository } from "@modules/cars/repositories/CategoriesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export default class ListCategoriesUseCase {
  constructor(@inject("CategoriesRepository") private categoriesRepository: CategoriesRepository) { }

  async execute(): Promise<Category[]> {
    return this.categoriesRepository.list();
  }
}
