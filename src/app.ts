import express, { Application, Request, Response } from "express";
import cors from "cors";
import { UsersRoutes } from "./modules/users/user.route";

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use("/api/v1/users", UsersRoutes);

const getAController = (req: Request, res: Response) => {
  res.send("get korteche naki?");
};

app.get("/", getAController);

export default app;
