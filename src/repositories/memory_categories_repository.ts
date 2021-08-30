import { Category } from "../model/category";
import {
  CategoriesRepository,
  CreateCategoryDTO,
} from "./categories_repository";

class MemoryCategoriesRepository implements CategoriesRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  public create({ name, description }: CreateCategoryDTO): void {
    this.categories.push(new Category({ name, description }));
  }

  public list(): Category[] {
    return this.categories;
  }

  public findByName(name: string): Category {
    return this.categories.find((category) => category.name === name);
  }
}

export { MemoryCategoriesRepository };
