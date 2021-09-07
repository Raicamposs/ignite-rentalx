import { Request, Response } from "express";

import ListSpecificationsUseCase from "./ListSpecificationsUseCase";

export class ListSpecificationsController {
  constructor(private listSpecificationsUseCase: ListSpecificationsUseCase) { }

  handle(_: Request, response: Response): Response {
    return response.json(this.listSpecificationsUseCase.execute());
  }
}
