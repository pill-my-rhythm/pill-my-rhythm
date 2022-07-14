import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import { stream } from "./utils/winston";

import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

import { UserRouter } from "./routes/userRouter";
import { BookMarkRouter } from "./routes/bookMarkRouter";
import { ScheduleRouter } from "./routes/scheduleRouter";
import { ChecklistRouter } from "./routes/checklistRouter";
import { SubscribeRouter } from "./routes/subscribeRouter";
import { SupplementRouter } from "./routes/supplementRouter";
import { errorMiddleware } from "./middlewares/errorMiddleware";

const app: express.Application = express();
const swaggerSpec = YAML.load(path.join(__dirname, "./swagger.yaml"));

// swagger
app.use("/api/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// morgan (request, response formatting)
app.use(morgan("combined", { stream }));

app.get("/api", (req: Request, res: Response) => {
  res.send("hello typescript express!");
});

app.use("/api/user", UserRouter);
app.use("/api/bookmark", BookMarkRouter);
app.use("/api/schedule", ScheduleRouter);
app.use("/api/checklist", ChecklistRouter);
app.use("/api/subscribe", SubscribeRouter);
app.use("/api/supplement", SupplementRouter);
app.use(errorMiddleware);

export default app;
