import { Specification } from "../../../entities/specification";
import { CreateSpecificationDTO, SpecificationsRepository } from "../../SpecificationsRepository";


class MemorySpecificationsRepository implements SpecificationsRepository {
  private specifications: Specification[];

  private static INSTANCE: MemorySpecificationsRepository;

  public static getInstance(): MemorySpecificationsRepository {
    if (!MemorySpecificationsRepository.INSTANCE) {
      MemorySpecificationsRepository.INSTANCE =
        new MemorySpecificationsRepository();
    }

    return MemorySpecificationsRepository.INSTANCE;
  }

  private constructor() {
    this.specifications = [];
  }

  public create({ name, description }: CreateSpecificationDTO): Promise<void> {
    return new Promise((resolve, _) => {
      const specification = new Specification();
      Object.assign(specification, { name, description, created_at: new Date() });
      this.specifications.push(specification);
      resolve();
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

export { MemorySpecificationsRepository };

