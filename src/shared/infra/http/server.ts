
import "@shared/container";
import { AppError } from "@shared/errors/AppErros";
import { router } from "@shared/infra/http/routes";
import createConnection from "@shared/infra/typeorm";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../../../swagger.json";




createConnection();
const app = express();
app.use(express.json());

router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerFile));

app.use(router);

app.use((err: Error, _: Request, response: Response, next: NextFunction) => {
  const { message } = err;

  console.error(err);

  if (err instanceof AppError) {
    return response.status(err.statusCode).send({ message });
  }

  return response.status(500).send({ status: 'error', message: `Internal serve error - ${message}` });
});

app.listen(3333, () => console.log("Server is running!"));
