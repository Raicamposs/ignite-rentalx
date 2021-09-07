import { Specification } from "../../model/specification";
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
    this.specifications.push(new Specification({ name, description }));
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
