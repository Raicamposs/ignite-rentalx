import { PostgresUsersRepository } from "@modules/accounts/repositories/implementations/PostgresUsersRepository";
import { UsersRepository } from "@modules/accounts/repositories/UsersRepository";
import { CategoriesRepository } from "@modules/cars/repositories/CategoriesRepository";
import { PostgresCategoriesRepository } from "@modules/cars/repositories/implementations/PostgresCategoriesRepository";
import { PostgresSpecificationsRepository } from "@modules/cars/repositories/implementations/PostgresSpecificationsRepository";
import { SpecificationsRepository } from "@modules/cars/repositories/SpecificationsRepository";
import "reflect-metadata";
import { container } from "tsyringe";


container.registerSingleton<CategoriesRepository>(
  "CategoriesRepository",
  PostgresCategoriesRepository
);

container.registerSingleton<SpecificationsRepository>(
  "SpecificationsRepository",
  PostgresSpecificationsRepository
);

container.registerSingleton<UsersRepository>(
  "UsersRepository",
  PostgresUsersRepository
);