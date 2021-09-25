import { CarImageRepository } from '@modules/cars/repositories/CarImageRepository';
import { getRepository, Repository } from "typeorm";
import { CarImage } from '../entities/CarImage';



class PostgresCarImageRepository implements CarImageRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }

  create(carId: string, imageName: string): Promise<CarImage> {
    const image = this.repository.create({ carId, imageName });
    return this.repository.save(image);
  }


}

export { PostgresCarImageRepository };

