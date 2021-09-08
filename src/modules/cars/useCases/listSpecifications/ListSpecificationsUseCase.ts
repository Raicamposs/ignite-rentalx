import { Category } from "../../entities/category";
import { SpecificationsRepository } from "../../repositories/SpecificationsRepository";

export default class ListSpecificationsUseCase {
  constructor(private specificationsRepository: SpecificationsRepository) { }

  execute(): Category[] {
    return this.specificationsRepository.list();
  }
}
