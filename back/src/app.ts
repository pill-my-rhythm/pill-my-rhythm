import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

import { userRouter } from "./routers/userRouter";

const app: express.Application = express();
const swaggerSpec = YAML.load(path.join(__dirname, "./swagger.yaml"));

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("hello typescript express!");
});

app.use(userRouter);

// swagger
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
