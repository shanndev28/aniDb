import { Sequelize } from 'sequelize'

const db = new Sequelize('appsgw', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db;