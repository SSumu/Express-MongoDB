import { Router } from "express";
import userRouter from "./user.mjs";

const rootRouter = Router(); // Execution of rootRouter

rootRouter.use("/user", userRouter); // Registration of Router

export default rootRouter;
