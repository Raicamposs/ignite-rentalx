

import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";
import { CarImageRepository } from "../CarImageRepository";

class CarImageRepositoryInMemory implements CarImageRepository {
  private images: CarImage[];

  constructor() {
    this.images = [];
  }

  create(carId: string, imageName: string): Promise<CarImage> {
    return new Promise((resolve, _) => {
      const image = new CarImage();
      Object.assign(image, { imageName, carId, createdAt: new Date() });
      this.images.push(image);
      resolve(image);
    });
  }

}

export { CarImageRepositoryInMemory };

