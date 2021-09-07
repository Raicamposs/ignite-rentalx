import { SpecificationsRepository } from "../../repositories/SpecificationsRepository";

interface Request {
  name: string;
  description: string;
}

export default class CreateSpecificationUseCase {
  constructor(private specificationsRepository: SpecificationsRepository) { }

  execute({ name, description }: Request): void {
    const specificationAlreadyExists =
      this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error("Specification Already exists!");
    }

    this.specificationsRepository.create({ name, description });
  }
}
