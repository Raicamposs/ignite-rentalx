import "reflect-metadata";
import { container } from "tsyringe";
import { CategoriesRepository } from "../../modules/cars/repositories/CategoriesRepository";
import { PostgresCategoriesRepository } from "../../modules/cars/repositories/implementations/postgres/PostgresCategoriesRepository";
import { PostgresSpecificationsRepository } from "../../modules/cars/repositories/implementations/postgres/PostgresSpecificationsRepository";
import { SpecificationsRepository } from "../../modules/cars/repositories/SpecificationsRepository";


container.registerSingleton<CategoriesRepository>(
  "CategoriesRepository",
  PostgresCategoriesRepository
);

container.registerSingleton<SpecificationsRepository>(
  "SpecificationsRepository",
  PostgresSpecificationsRepository
);