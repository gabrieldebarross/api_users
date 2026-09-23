import { Router } from "express";
import userController from "../controllers/user.controller.js";

const userRouter: Router = Router();

userRouter.post("/", 
    (req, res) => 
    userController.createUser(req, res)
);

export default userRouter;