const Sequelize = require('sequelize')
const connection = require('../config/connection')
const companyModel = require('../models/companyModel')

const returnInvoiceModel = connection.define(
    'returnInvoice',
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
            allowNull: false
        },
        date: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        type: {
            type: Sequelize.STRING,
        },
        product_name: {
            type: Sequelize.STRING,
            allowNull: false
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
returnInvoiceModel.belongsTo(companyModel, {
    as: 'companies',
    foreignKey: 'company_id'
})
module.exports = returnInvoiceModel