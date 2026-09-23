import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { database } from "../config/database.js";

class User extends Model<
    InferAttributes<User>, // Examina a classe e dizer ao Sequelize quais propriedades existem para o modelo completo quando busca uma linha no banco
    InferCreationAttributes<User> // Faz praticamente a mesma coisa do de cima, mas ele remove automaticamente os campos opcionais ou gerados pelo banco para quando for utilizar o metodo create
> {
    declare id: CreationOptional<number>;
    declare username: string;
    declare email: string;
    declare password: string;

    declare isActive: CreationOptional<boolean>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(150),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            field: "is_active"
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: "created_at"
        },

        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: "updated_at"
        }
    },
    {
        sequelize: database,
        tableName: "users",
        modelName: "User",
        timestamps: true,
        underscored: true
    }
)

export default User;