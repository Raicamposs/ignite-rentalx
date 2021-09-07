import { MemorySpecificationsRepository } from "../../repositories/implementations/MemorySpecificationsRepository";
import { ListSpecificationsController } from "./ListSpecificationsController";
import ListSpecificationsUseCase from "./ListSpecificationsUseCase";

const specificationsRepository = MemorySpecificationsRepository.getInstance();

const listSpecificationsUseCase = new ListSpecificationsUseCase(
  specificationsRepository
);

const listSpecificationsController = new ListSpecificationsController(
  listSpecificationsUseCase
);

export { listSpecificationsController };
