interface CreateCarDTO {
  name: string;
  description: string;
  licensePlate: string;
  dailyRate: number;
  fineAmount: number;
  brand: string;
  categoryId?: string;
}

export { CreateCarDTO }