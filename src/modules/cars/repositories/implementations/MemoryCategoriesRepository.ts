import { Category } from "../../entities/category";
import {
  CategoriesRepository,
  CreateCategoryDTO,
} from "../CategoriesRepository";

class MemoryCategoriesRepository implements CategoriesRepository {
  private categories: Category[];

  private static INSTANCE: MemoryCategoriesRepository;

  public static getInstance(): MemoryCategoriesRepository {
    if (!MemoryCategoriesRepository.INSTANCE) {
      MemoryCategoriesRepository.INSTANCE = new MemoryCategoriesRepository();
    }

    return MemoryCategoriesRepository.INSTANCE;
  }

  private constructor() {
    this.categories = [];
  }

  public create({ name, description }: CreateCategoryDTO): void {
    const category = new Category();
    Object.assign(category, { name, description, created_at: new Date() });
    this.categories.push(category);
  }

  public list(): Category[] {
    return this.categories;
  }

  public findByName(name: string): Category {
    return this.categories.find((category) => category.name === name);
  }
}

export { MemoryCategoriesRepository };
