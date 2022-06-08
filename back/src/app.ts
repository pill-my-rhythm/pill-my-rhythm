import express, { Request, Response } from "express";
import cors from "cors";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import { UserRouter } from "./routers/userRouter";

const app: express.Application = express();
const swaggerSpec = YAML.load(path.join(__dirname, "./swagger.yaml"));
// swagger
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  res.send("hello typescript express!");
});

app.use("/user", UserRouter);
app.use(errorMiddleware);

export default app;
