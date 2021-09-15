

import { getRepository, Repository } from "typeorm";
import {
  CategoriesRepository,
  CreateCategoryDTO
} from "../../../repositories/CategoriesRepository";
import { Category } from "../entities/category";

class PostgresCategoriesRepository implements CategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  public async create({ name, description }: CreateCategoryDTO): Promise<void> {
    const category = this.repository.create({ name, description });
    await this.repository.save(category);
  }

  public async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  public async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({ name });
    return category;
  }
}

export { PostgresCategoriesRepository };

