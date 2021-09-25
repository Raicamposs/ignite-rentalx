import { PostgresUsersRepository } from "@modules/accounts/infra/typeorm/repositories/PostgresUsersRepository";
import { UsersRepository } from "@modules/accounts/repositories/UsersRepository";
import { PostgresCarImageRepository } from "@modules/cars/infra/typeorm/repositories/PostgresCarImageRepository";
import { PostgresCarsRepository } from "@modules/cars/infra/typeorm/repositories/PostgresCarsRepository";
import { PostgresCategoriesRepository } from "@modules/cars/infra/typeorm/repositories/PostgresCategoriesRepository";
import { PostgresSpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/PostgresSpecificationsRepository";
import { CarImageRepository } from "@modules/cars/repositories/CarImageRepository";
import { CarsRepository } from "@modules/cars/repositories/CarRepository";
import { CategoriesRepository } from "@modules/cars/repositories/CategoriesRepository";
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

container.registerSingleton<CarsRepository>(
  "CarsRepository",
  PostgresCarsRepository
);
container.registerSingleton<CarImageRepository>(
  "CarImageRepository",
  PostgresCarImageRepository
);