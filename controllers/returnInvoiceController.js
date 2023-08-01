const comapanyModel = require('../models/companyModel')
const returnInvoiceModel = require('../models/returnInvoiceModel')

const createReturnInvoice = async (req, res) => {
    try {
        const payload = req.body
        console.log('api payload', payload)
        const data = payload.item_data.map((data) => {
            data.date = payload.date
            data.ref_no = payload.ref_no
            data.company_name = payload.company_name
            data.type = payload.type
            return data
        })
        const response = await returnInvoiceModel.bulkCreate(data)
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
const getReturnInvoice = async (req, res) => {
    try {
        if (req.query.id) {
            const id = req.query.id
            const response = await returnInvoiceModel.findOne({ where: { id: id } })
            if (!response) throw new Error(`Not found invoice with the id of ${id}`)
            res.status(200).send({
                status: true,
                data: response
            })
        }
        else {
            const response = await returnInvoiceModel.findAll({
                include: [{
                    model: comapanyModel,
                    as: 'company_name',
                    attributes: ['name'],
                    required: false
                }],
            })
            if (!response) throw new Error("Error Occurred while retriving invoice information")
            res.status(200).send({
                status: true,
                data: response
            })
        }
    } catch (error) {
        res.status(404).send({
            status: false,
            message: error
        })
    }
}

const updateReturnInvoice = async (req, res) => {
    try {
        const id = req.params.id
        const payload = req.body
        if (!id) throw new Error("id is missing from the request")

        if (!payload) throw new Error("Data to update can not be empty")

        const response = await returnInvoiceModel.update(
            payload
            , { where: { id: id } }
        )
        if (!response) throw new Error(`Cannot Update invoice with ${id}. Maybe invoice not found!`)
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

const deleteReturnInvoice = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) throw new Error("id is missing from the request")

        const response = await returnInvoiceModel.destroy({
            where: { id: id }
        })
        if (!response) throw new Error(`Cannot Delete invoice with id ${id}. Maybe id is wrong`)

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



module.exports = { createReturnInvoice, getReturnInvoice, updateReturnInvoice, deleteReturnInvoice }