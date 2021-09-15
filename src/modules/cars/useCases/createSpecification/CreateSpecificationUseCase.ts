import { AppError } from "@shared/errors/AppErros";
import { SpecificationsRepository } from "@modules/cars/repositories/SpecificationsRepository";
import { inject, injectable } from "tsyringe";

interface Request {
  name: string;
  description: string;
}

@injectable()
export default class CreateSpecificationUseCase {
  constructor(@inject("SpecificationsRepository") private specificationsRepository: SpecificationsRepository) { }

  async execute({ name, description }: Request): Promise<void> {
    const specificationAlreadyExists = await this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new AppError("Specification Already exists!");
    }

    await this.specificationsRepository.create({ name, description });
  }
}
