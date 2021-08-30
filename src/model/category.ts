import { v4 as uuidV4 } from "uuid";

export class Category {
  id?: string;
  name: string;
  description: string;
  created_at?: Date;

  constructor(data: Category) {
    Object.assign(this, data);
    this.id = this.id ?? uuidV4();
    this.created_at = this.created_at ?? new Date();
  }
}
