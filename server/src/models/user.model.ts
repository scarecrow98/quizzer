import { Model, DataTypes, Sequelize, HasMany } from 'sequelize';

export class User extends Model {
    declare id: number;
    public name!: string;
    public email!: string;

    static Quizes: HasMany;
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
        }
    }, { sequelize, createdAt: false, updatedAt: false });

    // User.hasMany(Quiz, { foreignKey: 'user_id', sourceKey: 'id' });
}