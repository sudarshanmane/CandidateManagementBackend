import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes/routes";
import { errorMiddleware } from "./common/middlewares/error.middleware";

const app: Application = express();

app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "OK" });
});

app.use(routes);

app.use(errorMiddleware);

export default app;
