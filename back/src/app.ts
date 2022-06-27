import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";

import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

import { UserRouter } from "./routes/userRouter";
import { BookMarkRouter } from "./routes/bookMarkRouter";
import { ScheduleRouter } from "./routes/scheduleRouter";
import { ChecklistRouter } from "./routes/checklistRouter";
import { SubscribeRouter } from "./routes/subscribeRouter";
import { errorMiddleware } from "./middlewares/errorMiddleware";

const app: express.Application = express();
const swaggerSpec = YAML.load(path.join(__dirname, "./swagger.yaml"));

// morgan (request, response formatting)
app.use(morgan("combined"));
// swagger
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  res.send("hello typescript express!");
});

app.use("/user", UserRouter);
app.use("/bookmark", BookMarkRouter);
app.use("/schedule", ScheduleRouter);
app.use("/checklist", ChecklistRouter);
app.use("/subscribe", SubscribeRouter);
app.use(errorMiddleware);

export default app;
