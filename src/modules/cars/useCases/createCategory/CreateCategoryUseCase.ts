import { inject, injectable } from "tsyringe";
import { CategoriesRepository } from "../../repositories/CategoriesRepository";
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
      throw new Error("Category Already exists!");
    }

    await this.categoriesRepository.create({ name, description });
  }
}
