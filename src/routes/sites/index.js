import { Router } from "express";
import { authRouter } from "./auth.js";
import { productRouter } from "./product.js"; 
import { userRouter } from "./user.js";
import { customerRouter } from "./customer.js";
import { commonRouter } from "./common.js";
import { loyaltyRouter } from "./loyalty.js";
import path from "path";
import fs from "fs";

const v1SiteRouter = Router();

// All auth routes will go here
v1SiteRouter.use("/product", productRouter);
v1SiteRouter.use("/auth", authRouter); 
v1SiteRouter.use("/user", userRouter);
v1SiteRouter.use("/customer", customerRouter);
v1SiteRouter.use("/common", commonRouter);
v1SiteRouter.use("/loyalty", loyaltyRouter);

//end used for testing purpose
export { v1SiteRouter };
