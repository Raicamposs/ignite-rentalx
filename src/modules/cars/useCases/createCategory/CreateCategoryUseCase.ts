import { CategoriesRepository } from "../../repositories/CategoriesRepository";

interface Request {
  name: string;
  description: string;
}

export default class CreateCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) { }

  execute({ name, description }: Request): void {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error("Category Already exists!");
    }

    this.categoriesRepository.create({ name, description });
  }
}
