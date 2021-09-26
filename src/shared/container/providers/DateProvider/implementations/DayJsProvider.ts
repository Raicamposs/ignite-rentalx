import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import { DateProvider } from "../DateProvider";


dayjs.extend(utc);


export class DayJsProvider implements DateProvider {

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  compareInHours(startDate: Date, endDate: Date): number {
    const startDateUTC = this.convertToUTC(startDate);
    const endDateUTC = this.convertToUTC(endDate);
    return dayjs(endDateUTC).diff(startDateUTC, "hours");
  }

}