import axios from 'axios'

export const createInvoice = async (payload) => {
    try {
        const { data: response } = await axios.post(`http://localhost:8080/invoice`, payload, {
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

export const getInvoices = async (query) => {
    try {
        const { data: response } = await axios.get(`http://localhost:8080/invoices/?${query}`, {
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

export const editInvoice = async (payload) => {
    try {
        const { data: response } = await axios.put(`http://localhost:8080/invoice/${payload.ref_no}`, payload, {
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

export const deleteInvoice = async (ref_no) => {
    try {
        const { data: response } = await axios.delete(`http://localhost:8080/invoice/${ref_no}`, {
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

