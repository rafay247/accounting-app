const comapanyModel = require('../models/companyModel')
const invoiceModel = require('../models/invoiceModel')

const createInvoice = async (req, res) => {
    try {
        const payload = req.body
        console.log('api payload', payload)

        const data = payload.item_data.map((data) => {
            data.date = payload.date
            data.ref_no = payload.ref_no
            data.company_ = payload.company_
            data.type = payload.type
            return data
        })
        const response = await invoiceModel.bulkCreate(data)

        await invoiceModel.create({
            ref_no: payload.ref_no,
            date: payload.date,
            company_: payload.company_,
            product_name: 'tranportation cost',
            total_amount: payload.transportation_cost,
            type: payload.type
        })

        res.status(200).send({
            status: true,
            message: response.toJSON()
        })

    } catch (error) {
        res.status(400).send({
            status: false,
            message: error
        })
    }
}
const getParams = (params) => {
    const where = {}
    if (params.id) where.id = params.id
    if (params.type) where.type = params.type
    if (params.company_) where.company_ = params.company_
    if (params.date) where.date = params.date
    if (params.ref_no) where.ref_no = params.ref_no
    if (params.product_name) where.product_name = params.product_name
    return where
}

const getInvoice = async (req, res) => {
    try {
        const response = await invoiceModel.findOne({
            where: getParams(req.query)
        })
        res.status(200).send({
            status: true,
            data: response
        })

    } catch (error) {
        res.status(404).send({
            status: false,
            message: error
        })
    }
}
const getInvoices = async (req, res) => {
    try {     
        const response = await invoiceModel.findAll({
            include: [{
                model: comapanyModel,
                as: 'companies',
                attributes: ['name'],
                required: false
            }],
            where: getParams(req.query),
            order: [
                ['id', 'ASC']
            ]
        })
        res.status(200).send({
            status: true,
            data: response
        })
    } catch (error) {
        res.status(404).send({
            status: false,
            message: error
        })
    }
}

// const updateInvoice = async (req, res) => {
//     try {
//         const ref_no = req.params.ref_no
//         let payload = req.body
//         console.log(ref_no);
//         console.log('payload', payload);
//         if (!ref_no) throw new Error("ref_no is missing from the request")

//         if (!payload) throw new Error("Data to update can not be empty")

//         let response = await invoiceModel.findAll(
//             { where: { ref_no: ref_no } }
//         )
//         console.log('reposne', response.length);
//         if (!response) throw new Error(`Cannot Update invoice with ${ref_no}. Maybe invoice not found!`)

//         let lastId = response[response.length - 1].dataValues.id
//         console.log(lastId)
//         response.pop()
//         response = response.map((val, i) => {
//             val = val.dataValues
//             val.ref_no = payload.ref_no
//             val.date = payload.date
//             val.company_ = payload.company_
//             val.type = payload.type
//             val.product_name = payload.item_data[i].product_name || null
//             val.qty = payload.item_data[i].qty || null
//             val.packing = payload.item_data[i].packing || null
//             val.total_weight = payload.item_data[i].total_weight || null
//             val.rate = payload.item_data[i].rate || null
//             val.total_amount = payload.item_data[i].total_amount || null
//             return val
//         })
//         response.push({
//             id: lastId,
//             ref_no: payload.ref_no,
//             date: payload.date,
//             company_: payload.company_,
//             type: payload.type,
//             product_name: 'tranportaion cost',
//             qty: null,
//             packing: null,
//             total_weight: null,
//             rate: null,
//             total_amount: payload.transportation_cost
//         })
//         response = { response }
//         console.log('response', response)

//         return res.status(200).send({
//             status: true,
//             message: 'record is updated'
//         })
//     } catch (error) {
//         return res.status(400).send({
//             status: false,
//             message: error
//         })
//     }
// }
const updateInvoice = async (req, res) => {
    try {
        const ref_no = req.params.ref_no
        const payload = req.body
        if (!ref_no) throw new Error("ref_no is missing from the request")

        if (!payload) throw new Error("Data to update can not be empty")

        const response = await invoiceModel.update(
            payload
            , { where: { ref_no: ref_no } }
        )
        if (!response) throw new Error(`Cannot Update invoice with ${ref_no}. Maybe invoice not found!`)
        return res.status(200).send({
            status: true,
            message: 'record is updated'
        })
    } catch (error) {
        return res.status(400).send({
            status: false,
            message: error
        })
    }
}

const deleteInvoice = async (req, res) => {
    try {
        if (!req.params.ref_no) throw new Error('ref_no is missing from request')

        const response = await invoiceModel.destroy({
            where: { ref_no: req.params.ref_no }
        })
        if (!response) throw new Error(`Cannot Delete invoice`)
        return res.status(200).send({
            status: true,
            message: "invoice was deleted successfully!"
        })
    } catch (error) {
        return res.status(400).send({
            status: false,
            message: error
        })

    }
}



module.exports = { createInvoice, getInvoice, getInvoices, updateInvoice, deleteInvoice }