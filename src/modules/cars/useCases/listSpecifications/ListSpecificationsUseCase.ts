import { Category } from "../../model/category";
import { SpecificationsRepository } from "../../repositories/SpecificationsRepository";

export default class ListSpecificationsUseCase {
  constructor(private specificationsRepository: SpecificationsRepository) { }

  execute(): Category[] {
    return this.specificationsRepository.list();
  }
}
