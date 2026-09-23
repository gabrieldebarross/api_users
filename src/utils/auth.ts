import bcrypt from "bcrypt";

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