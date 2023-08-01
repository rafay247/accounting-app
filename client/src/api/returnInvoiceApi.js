import axios from 'axios'

export const createReturnInvoice = async (payload) => {
    try {
        const { data: response } = await axios.post(`http://localhost:8080/return-invoice`, payload, {
            headers: {
                'Bearer-Token': '02'
            }
        })
        return response

    } catch (error) {
        return {
            status: false,
            message: error.message
        }
    }
}

export const getReturnInvoice = async () => {
    try {
        const { data: response } = await axios.get(`http://localhost:8080/return-invoices`, {
            headers: {
                'Bearer-Token': '02'
            }
        })
        return response

    } catch (error) {
        return {
            status: false,
            message: error.message
        }
    }
}

export const editReturnInvoice = async (payload) => {
    try {
        const { data: response } = await axios.put(`http://localhost:8080/return-invoice/${payload.id}`, payload, {
            headers: {
                'Bearer-Token': '02'
            }
        })
        return response

    } catch (error) {
        return {
            status: false,
            message: error.message
        }
    }
}

export const deleteReturnInvoice = async (id) => {
    try {
        const { data: response } = await axios.delete(`http://localhost:8080/return-invoice/${id}`)
        return response

    } catch (error) {
        return {
            status: false,
            message: error.message
        }
    }
}

