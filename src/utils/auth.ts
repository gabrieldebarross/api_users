import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "1d";
const saltRounds = 12;

export async function hashPassword(password: string){
    try {
        const hashedPassword = bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error){
        throw new Error('Erro ao gerar o hash da senha')
    }
}

export async function comparePassword(password: string, hashedPassword: string){
    try {
        const match = await bcrypt.compare(password, hashedPassword);
        return match;
    } catch (error) {
        throw new Error('Erro ao comparar senhas')
    }
}

export async function generateToken(user: User){
    const payload = {
        id: user.id,
        username: user.username,
        email: user.email
    };

    return jwt.sign(payload, String(JWT_SECRET), { 
        expiresIn: JWT_EXPIRES_IN
    });
}

export async function compareToken(token: string): Promise<{
    id: number,
    username: string,
    email: string
}>{
    return new Promise((resolve, reject) => {
        jwt.verify(token, String(JWT_SECRET), (err, decoded) => {
            if(err) {
                reject(err);
            } else {
                resolve(decoded as { id: number, username: string, email: string });
            }
        });
    })
}