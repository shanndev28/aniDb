import { Sequelize } from "sequelize";
import db from '../config/Databases.js';

const { DataTypes } = Sequelize;

const Genre = db.define('genre', {
    uuid: {
        primaryKey: true,
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
});

export default Genre;