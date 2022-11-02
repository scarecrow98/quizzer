import { Sequelize, DataTypes, BelongsTo, HasMany } from "sequelize";
import { Model } from "sequelize";
import { QuizQuestion } from "./quiz-question.model";
import { User } from "./user.model";

export class Quiz extends Model {
    declare id: number;
    title!: string;
    created_by!: User;
    create_at!: string;
    tag!: string;

    static User: BelongsTo;
    static Questions: HasMany;
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
        tag: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
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