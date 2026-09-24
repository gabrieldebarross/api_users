import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { check } from "express-validator";
import { validate } from "../utils/validateResult.js";

const userRouter: Router = Router();

userRouter.post("/", [
    check('email').isEmail().withMessage('Email inválido'),
    check('password').isLength({ min: 6, max: 30 }).withMessage('A senha deve ter no mínimo 6 e máximo 30 caracteres'),
    check('username').not().isEmpty().withMessage('O nome é obrigatório')
], 
    validate,
    userController.createUser
);

userRouter.post("/login", 
    userController.loginUser
);

export default userRouter;