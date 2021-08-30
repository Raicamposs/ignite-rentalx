import { Category } from "../model/category";

interface CreateCategoryDTO {
  name: string;
  description: string;
}

interface CategoriesRepository {
  create({ name, description }: CreateCategoryDTO): void;
  list(): Category[];
  findByName(name: string): Category;
}

export { CategoriesRepository, CreateCategoryDTO };
