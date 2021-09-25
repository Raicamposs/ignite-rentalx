import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { Car } from "./car";

@Entity("car_images")
export class CarImage {
  @PrimaryColumn()
  id?: string;

  @Column({ name: 'car_id' })
  carId?: string;

  @ManyToOne(() => Car)
  @JoinColumn({ name: 'car_id' })
  car: Car;

  @Column({ name: 'image_name' })
  imageName: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  constructor() {
    if (!this.id)
      this.id = uuidV4();
  }
}