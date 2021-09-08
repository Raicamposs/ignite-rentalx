import csvParse from "csv-parse";
import fs from "fs";

import { CategoriesRepository } from "../../repositories/CategoriesRepository";

interface ImportCategory {
  name: string;
  description: string;
}

export class ImportCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) { }

  private loadCategories(pathFile: fs.PathLike): Promise<ImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(pathFile);
      const parseFile = csvParse();

      const categories: ImportCategory[] = [];

      stream.pipe(parseFile);

      parseFile
        .on("data", (line) => {
          const [name, description] = line;
          categories.push({ name, description });
        })
        .on("end", () => {
          resolve(categories);
          fs.promises.unlink(pathFile);
        })
        .on("error", (error) => {
          reject(error);
          fs.promises.unlink(pathFile);
        });
    });
  }
  async execute(pathFile: fs.PathLike): Promise<void> {
    const categories = await this.loadCategories(pathFile);
    categories.forEach(async (category) => {
      const { name, description } = category;
      const existCategory = await this.categoriesRepository.findByName(name);

      if (!existCategory) {
        await this.categoriesRepository.create({ name, description });
      }
    });
  }
}
