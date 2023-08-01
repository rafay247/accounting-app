import axios from 'axios'

export const createPayment = async (payload) => {
    try {
        const { data: response } = await axios.post(`http://localhost:8080/payment`, payload, {
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

export const getPayment = async () => {
    try {
        const { data: response } = await axios.get(`http://localhost:8080/payments`, {
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

export const editPayment = async (payload) => {
    try {
        const { data: response } = await axios.put(`http://localhost:8080/payment/${payload.id}`, payload, {
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

export const deletePayment = async (id) => {
    try {
        const { data: response } = await axios.delete(`http://localhost:8080/payment/${id}`)
        return response

    } catch (error) {
        return {
            status: false,
            message: error.message
        }
    }
}

