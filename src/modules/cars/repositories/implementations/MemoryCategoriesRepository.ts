import { Category } from "../../model/category";
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
