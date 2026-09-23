import { Request, Response } from "express";

import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import { hashPassword } from "../utils/auth.js";

interface ICreateUser {
    username: string,
    email: string,
    password: string
}

class UserController {

    async createUser(
        req: Request,
        res: Response
    ) {
        try {
            const { username, email, password }: ICreateUser = req.body;
            
            if (!username || !email || !password) {
                res.status(StatusCodes.BAD_REQUEST).json({
                        error: true,
                        message: "Usuário, e-mail e senha são obrigatórios"
                    }
                )
            }

            const existingUser = await User.findOne({ where: { email } });
            if(existingUser){
                return res.status(StatusCodes.CONFLICT).json({
                    error: true,
                    message: "Não foi possível realizar o cadastro. Verifique suas informações e tente novamente"
                })
            }

            const hashedPassword = await hashPassword(password);

            const user = await User.create({
                username,
                email, 
                password: hashedPassword
            });

            const { password: _, ...userWithoutPassword } = user.toJSON();

            return res.status(StatusCodes.CREATED).json({
                message: 'Usuário criado com sucesso!',
                user: userWithoutPassword,
            });
        } catch (error){
            console.error('Erro ao criar o usuário', error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: 'Erro interno do servidor'
            })
        }
    };
}

export default new UserController;