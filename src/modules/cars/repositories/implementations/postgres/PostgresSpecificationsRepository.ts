import { getRepository, Repository } from "typeorm";
import { Specification } from "../../../entities/specification";
import {
  CreateSpecificationDTO,
  SpecificationsRepository
} from "../../SpecificationsRepository";

class PostgresSpecificationsRepository implements SpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  public async create({ name, description }: CreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({ name, description });
    await this.repository.save(specification);
  }

  public async list(): Promise<Specification[]> {
    const specifications = await this.repository.find();
    return specifications;
  }

  public async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ name });
    return specification;
  }
}

export { PostgresSpecificationsRepository };

