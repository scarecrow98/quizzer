import { Sequelize } from 'sequelize';

export const DB = new Sequelize({
    dialect: 'mysql',
    username: process.env.DB_USER,
    host: process.env.DB_HOST as string,
    port: parseInt(process.env.DB_PORT as string),
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}); 