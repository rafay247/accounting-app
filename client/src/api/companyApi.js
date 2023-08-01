import axios from 'axios'

export const createCompany = async (payload) => {
    try {
        const { data: response } = await axios.post(`http://localhost:8080/company`, payload, {
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

export const getCompany = async () => {
    try {
        const { data: response } = await axios.get('http://localhost:8080/companies', {
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

export const getReport = async (company_name) => {
    try {
        const { data: response } = await axios.get(`http://localhost:8080/company-report/${company_name}`, {
            headers: {
                'Bearer-Token': '02'
            }
        })
        console.log('axios', response)
        return response

    } catch (error) {
        return {
            status: false,
            message: error.message
        }
    }
}

export const editCompany = async (payload) => {
    try {
        console.log('axios', payload)
        const { data: response } = await axios.put(`http://localhost:8080/company/${payload.id}`, payload, {
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

export const deleteCompany = async (id) => {
    try {
        const { data: response } = await axios.delete(`http://localhost:8080/company/${id}`)
        return response

    } catch (error) {
        return {
            status: false,
            message: error.message
        }
    }
}

