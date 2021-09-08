import { Request, Response } from "express";

import ListSpecificationsUseCase from "./ListSpecificationsUseCase";

export class ListSpecificationsController {
  constructor(private listSpecificationsUseCase: ListSpecificationsUseCase) { }

  async handle(_: Request, response: Response): Promise<Response> {
    const specifications = await this.listSpecificationsUseCase.execute();
    return response.json(specifications);
  }
}
