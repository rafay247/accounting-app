const Sequelize = require('sequelize')
const connection = require('../config/connection')

const productModel = connection.define(
    'product',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
        },
        old_stock: {
            type: Sequelize.INTEGER
        },
        alternate_names: {
            type: Sequelize.STRING,
        }
    },
    {
        timestamps: false
    }
)
module.exports = productModel