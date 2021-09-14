import { Category } from "@modules/cars/entities/category";
import { SpecificationsRepository } from "@modules/cars/repositories/SpecificationsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export default class ListSpecificationsUseCase {
  constructor(@inject("SpecificationsRepository") private specificationsRepository: SpecificationsRepository) { }

  async execute(): Promise<Category[]> {
    return this.specificationsRepository.list();
  }
}
