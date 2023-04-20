const path = require('path');
const { Sequelize, Model, Op } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'db.sqlite'),
    logging: false
});

module.exports = {
    sequelize,
    Sequelize,
    Op
};