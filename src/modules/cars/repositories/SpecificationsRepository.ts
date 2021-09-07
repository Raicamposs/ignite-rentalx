import { Specification } from "../model/specification";

interface CreateSpecificationDTO {
  name: string;
  description: string;
}

interface SpecificationsRepository {
  create({ name, description }: CreateSpecificationDTO): void;
  list(): Specification[];
  findByName(name: string): Specification;
}

export { SpecificationsRepository, CreateSpecificationDTO };
