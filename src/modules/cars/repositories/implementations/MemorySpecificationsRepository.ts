import { Specification } from "../../entities/specification";
import {
  CreateSpecificationDTO,
  SpecificationsRepository,
} from "../SpecificationsRepository";

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

  public create({ name, description }: CreateSpecificationDTO): void {
    const specification = new Specification();
    Object.assign(specification, { name, description, created_at: new Date() });
    this.specifications.push(specification);
  }

  public list(): Specification[] {
    return this.specifications;
  }

  public findByName(name: string): Specification {
    return this.specifications.find(
      (specification) => specification.name === name
    );
  }
}

export { MemorySpecificationsRepository };
