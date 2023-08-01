import axios from 'axios'

export const createProduct = async (payload) => {
    try {
        const { data: response } = await axios.post(`http://localhost:8080/product`, payload, {
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

export const getProduct = async () => {
    try {
        const { data: response } = await axios.get(`http://localhost:8080/products`, {
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

export const editProduct = async (payload) => {
    try {
        const { data: response } = await axios.put(`http://localhost:8080/product/${payload.id}`, payload, {
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

export const deleteProduct = async (id) => {
    try {
        const { data: response } = await axios.delete(`http://localhost:8080/product/${id}`)
        return response

    } catch (error) {
        return {
            status: false,
            message: error.message
        }
    }
}

