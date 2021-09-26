import { container } from "tsyringe";
import { DateProvider } from "./DateProvider/DateProvider";
import { DayJsProvider } from "./DateProvider/implementations/DayJsProvider";

container.registerSingleton<DateProvider>(
  "DateProvider",
  DayJsProvider
);