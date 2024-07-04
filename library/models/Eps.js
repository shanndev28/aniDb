import Movies from "./Movies.js";
import { Sequelize } from "sequelize";
import db from '../config/Databases.js';

const { DataTypes } = Sequelize;

const Eps = db.define('eps', {
    uuid: {
        primaryKey: true,
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    movieUuid: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    video: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    eps: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
});

Movies.hasMany(Eps);
Eps.belongsTo(Movies, { foreignKey: 'movieUuid' })

export default Eps;