const {Joke} = require('./Joke');
const {sequelize, Sequelize, Op} = require('./db');

module.exports = {
    Joke,
    sequelize,
    Sequelize,
    Op
};
