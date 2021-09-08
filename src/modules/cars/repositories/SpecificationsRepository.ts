import { Specification } from "../entities/specification";

interface CreateSpecificationDTO {
  name: string;
  description: string;
}

interface SpecificationsRepository {
  create({ name, description }: CreateSpecificationDTO): Promise<void>;
  list(): Promise<Specification[]>;
  findByName(name: string): Promise<Specification>;
}

export { SpecificationsRepository, CreateSpecificationDTO };
