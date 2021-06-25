const Sequelize = require('sequelize');
const sequelize = new Sequelize('postapp', 'root', 'C8r7i6s5t4i3a2n1', {
    host: "localhost",
    port: "3306",
    dialect: 'mysql'
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}