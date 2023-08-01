const InvoiceModel = require('../models/invoiceModel')
const PaymentModel = require('../models/paymentModel')
const ReturnInvoiceModel = require('../models/returnInvoiceModel')
const CompanyModel = require('../models/companyModel')

const getReport = async (req, res) => {
    let response;
    let companyInfo = await CompanyModel.findOne({
        where: { name: req.params.company_name }
    })
    if (companyInfo.dataValues.type === 'sales') {
        response = await getReportOfSale([companyInfo.dataValues], req.params.company_name)
    } else {
        response = await getReportOfPurchase([companyInfo.dataValues], req.params.company_name)
    }
    res.status(200).send({
        status: true,
        data: response
    })
}
const getReportOfSale = async (companyInfo, company_name) => {
    let credit, balance;

    companyInfo = companyInfo.map((val, i) => {
        val.type = 'OB'
        credit = val.opening_balance
        val.credit = val.opening_balance
        balance = val.opening_balance
        val.balance = val.opening_balance
        delete val.mobile
        delete val.telephone
        delete val.name
        delete val.opening_balance
        delete val.id
        delete credit
        delete balance
        return val
    })

    let saleInvoice = await InvoiceModel.findAll({
        attributes: { exclude: ['id', 'company_name'] },
        where: { type: 'sales', company_name: company_name }
    })
    saleInvoice = saleInvoice.map((val, i) => {
        val = val.dataValues
        val.type = 'SI'
        val.credit = val.total_amount
        val.debit = ''
        val.balance = val.credit + balance
        balance = val.credit + balance
        delete balance
        return val
    })

    let payment = await PaymentModel.findAll({
        attributes: { exclude: ['id', 'company_name'] },
        where: { company_name: company_name }
    })
    payment = payment.map((val, i) => {
        val = val.dataValues
        val.type = (val.payment_type === 'receive') ? 'RCV' : 'PAY'
        val.product_name = val.description
        val.total_amount = val.amount
        val.credit = (val.payment_type === 'receive') ? '' : val.amount
        val.debit = (val.payment_type === 'receive') ? val.amount : ''
        val.balance = (val.payment_type === 'receive') ? balance - val.debit : val.credit + balance
        balance = (val.payment_type === 'receive') ? balance - val.debit : val.credit + balance
        delete balance
        delete val.payment_type
        delete val.description
        delete val.amount
        return val

    })
    let returnSaleInovice = await ReturnInvoiceModel.findAll({
        attributes: { exclude: ['id', 'company_name'] },
        where: { type: 'sales', company_name: company_name }
    })
    returnSaleInovice = returnSaleInovice.map((val, i) => {
        val = val.dataValues
        val.type = 'SRI'
        val.credit = ''
        val.debit = val.total_amount
        val.balance = balance - val.debit
        balance = balance - val.debit
        delete balance
        return val
    })

    let merge = [companyInfo, saleInvoice, payment, returnSaleInovice]
    let payload = Array.prototype.concat.apply([], merge)
    console.log('payload', payload)
    return payload

}
const getReportOfPurchase = async (companyInfo, company_name) => {
    let debit, balance;

    companyInfo = companyInfo.map((val, i) => {
        val.type = 'OB'
        debit = val.opening_balance
        val.debit = val.opening_balance
        balance = val.opening_balance
        val.balance = val.opening_balance
        delete val.mobile
        delete val.telephone
        delete val.name
        delete val.opening_balance
        delete val.id
        delete debit
        delete balance
        return val
    })
    let purchaseInvoice = await InvoiceModel.findAll({
        attributes: { exclude: ['id', 'company_name'] },
        where: { type: 'purchase', company_name: company_name }
    })
    purchaseInvoice = purchaseInvoice.map((val, i) => {
        val = val.dataValues
        val.type = 'PI'
        val.credit = ''
        val.debit = val.total_amount
        val.balance = balance - val.debit
        balance = balance - val.debit
        delete balance
        return val
    })
    let payment = await PaymentModel.findAll({
        attributes: { exclude: ['id', 'company_name'] },
        where: { company_name: company_name }
    })
    payment = payment.map((val, i) => {
        val = val.dataValues
        val.type = (val.payment_type === 'receive') ? 'RCV' : 'PAY'
        val.product_name = val.description
        val.total_amount = val.amount
        val.credit = (val.payment_type === 'receive') ? '' : val.amount
        val.debit = (val.payment_type === 'receive') ? val.amount : ''
        val.balance = (val.payment_type === 'receive') ? balance - val.debit : val.credit + balance
        balance = (val.payment_type === 'receive') ? balance - val.debit : val.credit + balance
        delete balance
        delete val.payment_type
        delete val.description
        delete val.amount
        return val

    })
    let returnPurchaseInovice = await ReturnInvoiceModel.findAll({
        attributes: { exclude: ['id', 'company_name'] },
        where: { type: 'puchase', company_name: company_name }
    })
    returnPurchaseInovice = returnPurchaseInovice.map((val, i) => {
        val = val.dataValues
        val.type = 'PRI'
        val.credit = val.total_amount
        val.debit = ''
        val.balance = balance + val.credit
        balance = balance + val.credit
        delete balance
    })
    let merge = [companyInfo, purchaseInvoice, payment, returnPurchaseInovice]
    let payload = Array.prototype.concat.apply([], merge)
    return payload
}

module.exports = { getReport }