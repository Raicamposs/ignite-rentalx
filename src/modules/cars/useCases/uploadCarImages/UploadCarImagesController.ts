import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadCarImagesUseCase } from "./UploadCarImagesUseCase";


export class UploadCarImagesController {
  constructor() { }

  async handle(request: Request, response: Response, next): Promise<Response> {
    const { id: carId } = request.params;
    const { files } = request;

    const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase);

    try {
      await uploadCarImagesUseCase.execute({ carId, imagesName: (files as Express.Multer.File[]).map(file => file.filename) });
      return response.status(201).send();
    } catch (e) {
      next(e)
    }
  }
}
