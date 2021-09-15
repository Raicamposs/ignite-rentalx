import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("users")
export class User {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  avatar: string;

  @Column()
  driver_licence: string;

  @Column()
  password: string;

  @Column()
  admin: boolean;

  @CreateDateColumn()
  created_at?: Date;

  constructor() {
    if (!this.id)
      this.id = uuidV4();
  }
}