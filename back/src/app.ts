import express from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import { UserRouter } from "./routers/userRouter";

const app: express.Application = express();
const swaggerSpec = YAML.load(path.join(__dirname, "./swagger.yaml"));

// swagger
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.send("hello typescript express!");
});

app.get("/user", UserRouter);

export default app;
