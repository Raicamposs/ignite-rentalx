import { PostgresSpecificationsRepository } from "../../repositories/implementations/postgres/PostgresSpecificationsRepository";
import { ListSpecificationsController } from "./ListSpecificationsController";
import ListSpecificationsUseCase from "./ListSpecificationsUseCase";


export default () => {
  const specificationsRepository = new PostgresSpecificationsRepository();

  const listSpecificationsUseCase = new ListSpecificationsUseCase(
    specificationsRepository
  );

  const listSpecificationsController = new ListSpecificationsController(
    listSpecificationsUseCase
  );

  return listSpecificationsController;
};

