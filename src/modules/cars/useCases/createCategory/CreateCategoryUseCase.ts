import { CategoriesRepository } from "../../repositories/CategoriesRepository";

interface Request {
  name: string;
  description: string;
}

export default class CreateCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) { }

  async execute({ name, description }: Request): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error("Category Already exists!");
    }

    await this.categoriesRepository.create({ name, description });
  }
}
