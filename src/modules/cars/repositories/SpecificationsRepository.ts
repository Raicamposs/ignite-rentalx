import { Specification } from "../infra/typeorm/entities/specification";
interface CreateSpecificationDTO {
  name: string;
  description: string;
}

interface SpecificationsRepository {
  create({ name, description }: CreateSpecificationDTO): Promise<Specification>;
  list(): Promise<Specification[]>;
  findByName(name: string): Promise<Specification>;
  findByIds(ids: string[]): Promise<Specification[]>;
}

export { SpecificationsRepository, CreateSpecificationDTO };

