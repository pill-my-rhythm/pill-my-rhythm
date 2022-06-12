import express, { Request, Response } from "express";
import cors from "cors";

import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

import { UserRouter } from "./routes/userRouter";
import { ScheduleRouter } from "./routes/scheduleRouter";
import { ChecklistRouter } from "./routes/checklistRouter";
import { errorMiddleware } from "./middlewares/errorMiddleware";

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
app.use("/schedule", ScheduleRouter);
app.use("/checklist", ChecklistRouter);
app.use(errorMiddleware);

export default app;
