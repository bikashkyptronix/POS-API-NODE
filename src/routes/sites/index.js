import { Router } from "express";
import { authRouter } from "./auth.js";
//import { siteRouter } from "./site.js";
import { userRouter } from "./user.js";
import path from "path";
import fs from "fs";

const v1SiteRouter = Router();

// All auth routes will go here
//v1SiteRouter.use("/", siteRouter);
v1SiteRouter.use("/auth", authRouter);
v1SiteRouter.use("/user", userRouter);

//end used for testing purpose
export { v1SiteRouter };
