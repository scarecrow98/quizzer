import { Model, Sequelize, DataTypes, BelongsTo } from "sequelize";

export class Answer extends Model {
    public user_id!: number;
    public question_id!: number;
    public answer!: string;

    static User: BelongsTo;
    static QuizQuestion: BelongsTo;
}

export const initAnswerModel = (sequelize: Sequelize) => {
    Answer.init({
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        question_id: {
            type: DataTypes.INET,
            primaryKey: true
        },
        answer: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, { sequelize, createdAt: false, updatedAt: false });
}