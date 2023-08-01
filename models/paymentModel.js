const Sequelize = require('sequelize')
const connection = require('../config/connection')
const companyModel = require('../models/companyModel')

const paymentModel = connection.define(
    'payment',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        company_id: {
            type: Sequelize.INTEGER,
            references: {
                model: companyModel,
                key: 'id'
            }
        },
        date: {
            type: Sequelize.DATEONLY,
        },
        payment_type: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.STRING,
        },
        amount: {
            type: Sequelize.INTEGER,
        },
    },
    {
        timestamps: false
    }
)
paymentModel.belongsTo(companyModel, {
    as: 'companies',
    foreignKey: 'company_id'
})

module.exports = paymentModel