import { Category } from "../infra/typeorm/entities/category";

interface CreateCategoryDTO {
  name: string;
  description: string;
}

interface CategoriesRepository {
  create({ name, description }: CreateCategoryDTO): Promise<void>;
  list(): Promise<Category[]>;
  findByName(name: string): Promise<Category>;
}

export { CategoriesRepository, CreateCategoryDTO };
