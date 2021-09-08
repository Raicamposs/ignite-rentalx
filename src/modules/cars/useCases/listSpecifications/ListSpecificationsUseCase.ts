import { inject, injectable } from "tsyringe";
import { Category } from "../../entities/category";
import { SpecificationsRepository } from "../../repositories/SpecificationsRepository";
@injectable()
export default class ListSpecificationsUseCase {
  constructor(@inject("SpecificationsRepository") private specificationsRepository: SpecificationsRepository) { }

  async execute(): Promise<Category[]> {
    return this.specificationsRepository.list();
  }
}
