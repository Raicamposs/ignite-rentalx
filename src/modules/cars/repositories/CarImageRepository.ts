import { CarImage } from "../infra/typeorm/entities/CarImage";

interface CarImageRepository {
  create(carId: string, imageName: string): Promise<CarImage>;
}

export { CarImageRepository };

