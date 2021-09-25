
import { getRepository, Repository } from "typeorm";
import { CreateSpecificationDTO, SpecificationsRepository } from "../../../repositories/SpecificationsRepository";
import { Specification } from "../entities/specification";

class PostgresSpecificationsRepository implements SpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  findByIds(ids: string[]): Promise<Specification[]> {
    return this.repository.findByIds(ids);
  }

  public async create({ name, description }: CreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({ name, description });
    return this.repository.save(specification);
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

