const comapanyModel = require('../models/companyModel')

const createCompany = async (req, res) => {
    try {
        const payload = req.body
        console.log('api', payload)
        const response = await comapanyModel.create(payload)
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
const getCompany = async (req, res) => {
    try {
        if (req.query.id) {
            const id = req.query.id;
            const response = await comapanyModel.findOne({ where: { id: id } })
            if (!response) throw new Error(`Not found company with the id of ${id}`)
            res.status(200).send({
                status: true,
                data: response
            })
        }
        else {
            const response = await comapanyModel.findAll()
            if (!response) throw new Error("Error Occurred while retriving company information")
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

const updateCompany = async (req, res) => {
    try {
        const id = req.params.id
        const payload = req.body
        if (!id) throw new Error("id is missing from the request")

        if (!payload) throw new Error("Data to update can not be empty")

        const response = await comapanyModel.update(
            payload
            , { where: { id: id } }
        )
        if (!response) throw new Error(`Cannot Update company with ${id}. Maybe company not found!`)
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

const deleteCompany = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) throw new Error("id is missing from the request")

        const response = await comapanyModel.destroy({
            where: { id: id }
        })
        if (!response) throw new Error(`Cannot Delete company with id ${id}. Maybe id is wrong`)

        return res.status(200).send({
            status: true,
            message: "company was deleted successfully!"
        })
    } catch (error) {
        return res.status(400).send({
            status: false,
            message: error
        })

    }
}



module.exports = { createCompany, getCompany, updateCompany, deleteCompany }


