import express, { ErrorRequestHandler } from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./Routes";
import { errorHandler } from "./middleware/errors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(router)
app.use(errorHandler)
export default app;