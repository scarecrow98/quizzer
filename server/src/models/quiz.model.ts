import { Sequelize, DataTypes } from "sequelize";
import { Model } from "sequelize";
import { QuizQuestion } from "./quiz-question.model";
import { User } from "./user.model";

export class Quiz extends Model {
    declare id: string;
    title!: string;
    created_by!: User;
    create_at!: string;
}

export const initQuizModel = (sequelize: Sequelize) => {
    Quiz.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        created_by: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, { sequelize, createdAt: false, updatedAt: false, tableName: 'quizes' });

    // Quiz.belongsTo(User, { foreignKey: 'user_id', targetKey: 'id' });
    // Quiz.hasMany(QuizQuestion, { foreignKey: 'quiz_id', sourceKey: 'id' });
}