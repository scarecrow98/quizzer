import { Sequelize, DataTypes } from "sequelize";
import { Model } from "sequelize";
import { Quiz } from "./quiz.model";
import { User } from "./user.model";

export class QuizQuestion extends Model {
    declare id: string;
    quiz!: string;
    created_by!: number;
    create_at!: string;
}

export const initQuizQuestionModel = (sequelize: Sequelize) => {
    QuizQuestion.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        quiz_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Quiz,
                key: 'id'
            }
        },
        question: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM('text', 'numeric', 'choice'),
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        },
        choices: {
            type: DataTypes.JSON,
            allowNull: false,
            defaultValue: '[]'
        }
    }, { sequelize, createdAt: false, updatedAt: false, tableName: 'quiz_questions' });

    // QuizQuestion.belongsTo(Quiz, { foreignKey: 'quiz_id', targetKey: 'id' });
}