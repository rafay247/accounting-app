const comapanyModel = require('../models/companyModel')
const paymentModel = require('../models/paymentModel')

const createPayment = async (req, res) => {
    try {
        const payload = req.body
        console.log('api', payload)
        const response = await paymentModel.create(payload)
        res.status(200).send({
            status: true,
            message: response.toJSON(),
        })

    } catch (error) {
        res.status(400).send({
            status: false,
            message: error
        })
    }
}
const getPayment = async (req, res) => {
    try {
        if (req.query.id) {
            const id = req.query.id;
            const response = await paymentModel.findOne({ where: { id: id } })
            if (!response) throw new Error(`Not found payment with the id of ${id}`)
            res.status(200).send({
                status: true,
                data: response
            })
        }
        else {
            const response = await paymentModel.findAll({
                include: [{
                    model: comapanyModel,
                    as: 'companies',
                    attributes: ['name'],
                    required: false
                }],
            })
            console.log(response)
            if (!response) throw new Error("Error Occurred while retriving payment information")
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

const updatePayment = async (req, res) => {
    try {
        const id = req.params.id
        const payload = req.body
        if (!id) throw new Error("id is missing from the request")

        if (!payload) throw new Error("Data to update can not be empty")

        const response = await paymentModel.update(
            payload
            , { where: { id: id } }
        )
        if (!response) throw new Error(`Cannot Update payment with ${id}. Maybe payment not found!`)
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

const deletePayment = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) throw new Error("id is missing from the request")

        const response = await paymentModel.destroy({
            where: { id: id }
        })
        if (!response) throw new Error(`Cannot Delete payment with id ${id}. Maybe id is wrong`)

        return res.status(200).send({
            status: true,
            message: "payment was deleted successfully!"
        })
    } catch (error) {
        return res.status(400).send({
            status: false,
            message: error
        })

    }
}



module.exports = { createPayment, getPayment, updatePayment, deletePayment }


