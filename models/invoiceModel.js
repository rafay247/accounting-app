const Sequelize = require('sequelize')
const connection = require('../config/connection')
const companyModel = require('../models/companyModel')

const invoiceModel = connection.define(
    'invoice',
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
        ref_no: {
            type: Sequelize.INTEGER,
        },
        date: {
            type: Sequelize.DATEONLY,
        },
        type: {
            type: Sequelize.STRING,
        },
        product_name: {
            type: Sequelize.STRING,
        },
        qty: {
            type: Sequelize.INTEGER,
        },
        packing: {
            type: Sequelize.FLOAT,
        },
        total_weight: {
            type: Sequelize.FLOAT,
        },
        rate: {
            type: Sequelize.INTEGER,
        },
        total_amount: {
            type: Sequelize.INTEGER,
        },
    },
    {
        timestamps: false
    }

)
invoiceModel.belongsTo(companyModel, {
    as: 'companies',
    foreignKey: 'company_id'
})


module.exports = invoiceModel