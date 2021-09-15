import { Entity, Column, CreateDateColumn, PrimaryColumn, JoinColumn, ManyToOne } from "typeorm";
import { Category } from "./category";
import { v4 as uuidV4 } from "uuid";

@Entity("cars")
export class Car {

  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ name: 'license_plate' })
  licensePlate: string;

  @Column({ name: 'daily_rate' })
  dailyRate: number;

  @Column()
  available: boolean;

  @Column({ name: 'fine_amount' })
  fineAmount: number;

  @Column()
  brand: string;

  @Column({ name: 'category_id' })
  categoryId?: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  constructor() {
    if (!this.id)
      this.id = uuidV4();
  }
}
