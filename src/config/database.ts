import { Sequelize } from "sequelize";
import { env } from "./env.js";

export const database = new Sequelize(
    env.database.name,
    env.database.user,
    env.database.password,
    {
        host: env.database.host,
        port: env.database.port,
        dialect: "mysql",

        logging: false,

        define: {
            timestamps: true,
            underscored: true
        }
    }
);

export async function connectDb(): Promise<void> {
    try {
        await database.authenticate();
        console.log("Banco de dados conectado!");
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error);
        process.exit(1);
    }
};

