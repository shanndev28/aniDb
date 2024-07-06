import { Sequelize } from 'sequelize'

const db = new Sequelize('animedb', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db;