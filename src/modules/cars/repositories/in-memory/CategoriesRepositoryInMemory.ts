import { Category } from "../../entities/category";
import {
  CategoriesRepository,
  CreateCategoryDTO,
} from "../CategoriesRepository";

class CategoriesRepositoryInMemory implements CategoriesRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  public create({ name, description }: CreateCategoryDTO): Promise<void> {
    return new Promise((resolve, _) => {
      const category = new Category();
      Object.assign(category, { name, description, created_at: new Date() });
      this.categories.push(category);
      resolve();
    });
  }

  public list(): Promise<Category[]> {
    return new Promise((resolve, _) => {
      resolve(this.categories);
    });
  }

  public findByName(name: string): Promise<Category> {
    return new Promise((resolve, _) => {
      resolve(this.categories.find((category) => category.name === name));
    });
  }
}

export { CategoriesRepositoryInMemory };
