const express = require('express')
const router = express.Router()

const { createCompany, getCompany, updateCompany, deleteCompany } = require('../controllers/companyController')
const { createInvoice, getInvoice, getInvoices, updateInvoice, deleteInvoice } = require('../controllers/invoiceController')
const { createReturnInvoice, getReturnInvoice, updateReturnInvoice, deleteReturnInvoice } = require('../controllers/returnInvoiceController')
const { createPayment, getPayment, updatePayment, deletePayment } = require('../controllers/paymentController')
const { createProduct, getProduct, updateProduct, deleteProduct } = require('../controllers/porductController')
const { getReport } = require('../controllers/reportController')

router.post('/company', createCompany)
router.get('/companies', getCompany)
router.put('/company/:id', updateCompany)
router.delete('/company/:id', deleteCompany)
router.get('/company-report/:company_name', getReport)

router.post('/invoice', createInvoice)
router.get('/invoice', getInvoice)
router.get('/invoices', getInvoices)
router.put('/invoice/:ref_no', updateInvoice)
router.delete('/invoice/:ref_no', deleteInvoice)

router.post('/return-invoice', createReturnInvoice)
router.get('/return-invoices', getReturnInvoice)
// router.put('/return-invoice/:id', updateReturnInvoice)
router.delete('/return-invoice/:id', deleteReturnInvoice)

router.post('/payment', createPayment)
router.get('/payments', getPayment)
router.put('/payment/:id', updatePayment)
router.delete('/payment/:id', deletePayment)

router.post('/product', createProduct)
router.get('/products', getProduct)
router.put('/product/:id', updateProduct)
router.delete('/product/:id', deleteProduct)

module.exports = router