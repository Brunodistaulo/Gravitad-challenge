import { Router } from "express";
import { login, register } from "../Controllers/authController";

const userRouter = Router();

userRouter.post("/login", login)
userRouter.post("/register", register)

export default userRouter