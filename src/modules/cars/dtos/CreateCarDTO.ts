import { Specification } from "../infra/typeorm/entities/specification";

interface CreateCarDTO {
  id?: string;
  name: string;
  description: string;
  licensePlate: string;
  dailyRate: number;
  fineAmount: number;
  brand: string;
  categoryId?: string;
  specifications?: Specification[];
}

export { CreateCarDTO };

