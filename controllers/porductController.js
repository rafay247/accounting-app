const productModel = require('../models/productModel')

const createProduct = async (req, res) => {
    try {
        const payload = req.body
        console.log('api', payload)
        const response = await productModel.create(payload)
        res.status(200).send({
            status: true,
            message: `product is created with id ${response.id}`,
        })

    } catch (error) {
        res.status(400).send({
            status: false,
            message: error
        })
    }
}
const getProduct = async (req, res) => {
    try {
        if (req.query.id) {
            const id = req.query.id;
            const response = await productModel.findOne({ where: { id: id } })
            if (!response) throw new Error(`Not found product with the id of ${id}`)
            res.status(200).send({
                status: true,
                data: response
            })
        }
        else {
            const response = await productModel.findAll()
            if (!response) throw new Error("Error Occurred while retriving product information")
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

const updateProduct = async (req, res) => {
    try {
        const id = req.params.id
        const payload = req.body
        if (!id) throw new Error("id is missing from the request")

        if (!payload) throw new Error("Data to update can not be empty")

        const response = await productModel.update(
            payload
            , { where: { id: id } }
        )
        if (!response) throw new Error(`Cannot Update product with ${id}. Maybe product not found!`)
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

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) throw new Error("id is missing from the request")

        const response = await productModel.destroy({
            where: { id: id }
        })
        if (!response) throw new Error(`Cannot Delete product with id ${id}. Maybe id is wrong`)

        return res.status(200).send({
            status: true,
            message: "product was deleted successfully!"
        })
    } catch (error) {
        return res.status(400).send({
            status: false,
            message: error
        })

    }
}



module.exports = { createProduct, getProduct, updateProduct, deleteProduct }


