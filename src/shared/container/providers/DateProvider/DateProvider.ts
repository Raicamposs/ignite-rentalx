export interface DateProvider {
  compareInHours(startDate: Date, endDate: Date): number;
  compareInDays(startDate: Date, endDate: Date): number;
  convertToUTC(date: Date): string;
  addDays(days: number): Date;
  addHours(hours: number): Date;
  compareIfBefore(startDate: Date, endDate: Date): boolean;
}