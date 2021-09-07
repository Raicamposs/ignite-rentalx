import { MemorySpecificationsRepository } from "../../repositories/implementations/MemorySpecificationsRepository";
import { CreateSpecificationController } from "./CreateSpecificationController";
import CreateSpecificationUseCase from "./CreateSpecificationUseCase";

const categoriesRepository = MemorySpecificationsRepository.getInstance();

const createSpecificationUseCase = new CreateSpecificationUseCase(
  categoriesRepository
);

const createSpecificationController = new CreateSpecificationController(
  createSpecificationUseCase
);

export { createSpecificationController };
