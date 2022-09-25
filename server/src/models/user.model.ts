import { Model, DataTypes, Sequelize } from 'sequelize';

export class User extends Model {
    declare id: number;
    public name!: string;
    public email!: string;
}

export const initUserModel = (sequelize: Sequelize) => {
    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, { sequelize, createdAt: false, updatedAt: false });
}