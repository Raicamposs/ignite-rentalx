
import { Specification } from "@modules/cars/infra/typeorm/entities/specification";
import { CreateSpecificationDTO, SpecificationsRepository } from "../SpecificationsRepository";


class SpecificationsRepositoryInMemory implements SpecificationsRepository {
  private specifications: Specification[];

  constructor() {
    this.specifications = [];
  }

  findByIds(ids: string[]): Promise<Specification[]> {
    return new Promise((resolve, _) => {
      resolve(this.specifications.filter((specification) => ids.includes(specification.id)));
    });
  }

  public create({ name, description }: CreateSpecificationDTO): Promise<Specification> {
    return new Promise((resolve, _) => {
      const specification = new Specification();
      Object.assign(specification, { name, description, created_at: new Date() });
      this.specifications.push(specification);
      resolve(specification);
    });
  }

  public list(): Promise<Specification[]> {
    return new Promise((resolve, _) => {
      resolve(this.specifications);
    });
  }

  public findByName(name: string): Promise<Specification> {
    return new Promise((resolve, _) => {
      resolve(this.specifications.find(
        (specification) => specification.name === name
      ));
    });
  }
}

export { SpecificationsRepositoryInMemory };

