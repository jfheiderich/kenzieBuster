import express, { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { AppDataSource } from "./data-source";
import { User } from "./entities/User";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

app.post("/login", async (req: Request, res: Response) => {
  const user: User = await AppDataSource.getRepository(User).findOneBy({
    email: req.body.email,
  });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  if (!(await user.comparePwd(req.body.password))) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  const token: string = sign({ ...user }, process.env.SECRET_KEY, {
    expiresIn: process.env.EXPIRES_IN,
  });

  return res.status(200).json({ token });
});

export default app;