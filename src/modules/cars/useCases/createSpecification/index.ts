
import { PostgresSpecificationsRepository } from "../../repositories/implementations/postgres/PostgresSpecificationsRepository";
import { CreateSpecificationController } from "./CreateSpecificationController";
import CreateSpecificationUseCase from "./CreateSpecificationUseCase";


export default () => {
  const categoriesRepository = new PostgresSpecificationsRepository();

  const createSpecificationUseCase = new CreateSpecificationUseCase(
    categoriesRepository
  );

  const createSpecificationController = new CreateSpecificationController(
    createSpecificationUseCase
  );

  return createSpecificationController
};

