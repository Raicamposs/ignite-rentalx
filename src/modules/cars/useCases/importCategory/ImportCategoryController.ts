import { Request, Response } from "express";
import { container } from "tsyringe";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

export class ImportCategoryController {
  constructor() { }

  async handle(request: Request, response: Response, next): Promise<Response> {
    const { file } = request;

    const importCategoryUseCase = container.resolve(ImportCategoryUseCase);
    try {
      await importCategoryUseCase.execute(file.path);
      return response.send();
    } catch (e) {
      next(e)
    }
  }
}
