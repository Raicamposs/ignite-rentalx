import { AppError } from "@errors/AppErros";
import { CategoriesRepository } from "@modules/cars/repositories/CategoriesRepository";
import { inject, injectable } from "tsyringe";

interface Request {
  name: string;
  description: string;
}

@injectable()
export default class CreateCategoryUseCase {
  constructor(@inject("CategoriesRepository") private categoriesRepository: CategoriesRepository) { }

  async execute({ name, description }: Request): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new AppError("Category Already exists!");
    }

    await this.categoriesRepository.create({ name, description });
  }
}
