const Sequelize = require('sequelize')
const connection = require('../config/connection')

const comapanyModel = connection.define(
    'comapany',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        opening_balance: {
            type: Sequelize.INTEGER
        },
        mobile: {
            type: Sequelize.STRING
        },
        telephone: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        },
    },
    {
        timestamps: false
    }
)
module.exports = comapanyModel