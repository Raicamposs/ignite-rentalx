import express from "express";
import swaggerUi from "swagger-ui-express";

import { router } from "./routes";
import swaggerFile from "./swagger.json";

import "./database";

const app = express();
app.use(express.json());

router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerFile));

app.use(router);

app.listen(3333, () => console.log("Server is running!"));
