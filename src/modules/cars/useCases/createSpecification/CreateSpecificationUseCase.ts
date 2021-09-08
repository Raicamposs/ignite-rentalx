import { inject, injectable } from "tsyringe";
import { SpecificationsRepository } from "../../repositories/SpecificationsRepository";
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
      throw new Error("Specification Already exists!");
    }

    await this.specificationsRepository.create({ name, description });
  }
}
