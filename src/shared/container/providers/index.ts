import { container } from "tsyringe";
import { DateProvider } from "./DateProvider/DateProvider";
import { DayJsProvider } from "./DateProvider/implementations/DayJsProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";
import { MailProvider } from "./MailProvider/MailProvider";

container.registerSingleton<DateProvider>(
  "DateProvider",
  DayJsProvider
);

container.registerInstance<MailProvider>(
  "MailProvider",
  new EtherealMailProvider()
);