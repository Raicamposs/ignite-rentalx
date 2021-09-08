import { Request, Response } from "express";

import { ImportCategoryUseCase } from "./ImportCategoryUseCase";
import { container } from "tsyringe";
export class ImportCategoryController {
  constructor() { }

  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    const importCategoryUseCase = container.resolve(ImportCategoryUseCase);
    await importCategoryUseCase.execute(file.path);
    return response.send();
  }
}
