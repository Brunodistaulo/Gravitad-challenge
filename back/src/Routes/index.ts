import { Router } from "express";
import userRouter from "./usersRoute";
import movieRouter from "./movieRoute";


const router = Router();

router.use("/users", userRouter);
router.use("/movies", movieRouter);

export default router