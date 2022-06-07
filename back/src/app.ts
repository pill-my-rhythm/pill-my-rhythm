import express from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import bodyParser from "body-parser";
import session from "express-session";
import bcrypt from "bcrypt-nodejs";
import { UserRouter } from "./routers/userRouter";

const app: express.Application = express();
const swaggerSpec = YAML.load(path.join(__dirname, "./swagger.yaml"));

// swagger
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// session
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: "shthdgml&qkrwjddbs==BACKEND",
    resave: false,
    saveUninitialized: true,
  }),
);

app.get("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.send("hello typescript express!");
});

app.get("/login", UserRouter);

export default app;
