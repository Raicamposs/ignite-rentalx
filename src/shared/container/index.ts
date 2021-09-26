import { PostgresUsersRepository } from "@modules/accounts/infra/typeorm/repositories/PostgresUsersRepository";
import { PostgresUsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/PostgresUsersTokensRepository";
import { UsersRepository } from "@modules/accounts/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/accounts/repositories/UsersTokensRepository";
import { PostgresCarImageRepository } from "@modules/cars/infra/typeorm/repositories/PostgresCarImageRepository";
import { PostgresCarsRepository } from "@modules/cars/infra/typeorm/repositories/PostgresCarsRepository";
import { PostgresCategoriesRepository } from "@modules/cars/infra/typeorm/repositories/PostgresCategoriesRepository";
import { PostgresSpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/PostgresSpecificationsRepository";
import { CarImageRepository } from "@modules/cars/repositories/CarImageRepository";
import { CarsRepository } from "@modules/cars/repositories/CarRepository";
import { CategoriesRepository } from "@modules/cars/repositories/CategoriesRepository";
import { SpecificationsRepository } from "@modules/cars/repositories/SpecificationsRepository";
import { PostgresRentalsRepository } from "@modules/rentals/infra/typeorm/repositories/PostgresRentalsRepository";
import { RentalsRepository } from "@modules/rentals/repositories/RentalsRepository";
import "reflect-metadata";
import { container } from "tsyringe";
import "./providers";


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

container.registerSingleton<RentalsRepository>(
  "RentalsRepository",
  PostgresRentalsRepository
);

container.registerSingleton<UsersTokensRepository>(
  "UsersTokensRepository",
  PostgresUsersTokensRepository
);

