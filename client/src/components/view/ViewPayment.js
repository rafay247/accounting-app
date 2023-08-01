import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import * as PaymentApi from '../../api/paymentApi'
import { useEffect, useState } from 'react'
const ViewPayment = () => {

    const [data, setData] = useState([])

    const getAllPayments = async () => {
        const response = await PaymentApi.getPayment()
        console.log(response.data)
        setData(response.data)
    }
    const handleDeleteField = async (id) => {
        if (window.confirm("Are you sure you want to delete this company !")) {
            setData((prev) => {
                prev = prev.filter(x => x.id !== id)
                return [...prev]
            })
            const response = await PaymentApi.deletePayment(id)
            console.log(response)
        }
    }

    useEffect(() => {
        getAllPayments()
    }, [])


    return (
        <div className='container-fluid'>
            <div className='card mt-5'>
                <div className='bg-dark card-header text-center fw-bold'>
                    <h2 style={{ color: 'navajowhite' }}>PAYMENTS</h2>
                </div>

            </div>
            <table className="table table-hover table-xl table-bordered text-center">
                <thead className='table-light fw-bolder'>
                    <tr>
                        <th scope="col" style={{ width: '3%' }}>S.no</th>
                        <th scope="col">DATE</th>
                        <th scope="col">COMPANY NAME</th>
                        <th scope="col">TYPE</th>
                        <th scope="col">DESCRIPTION</th>
                        <th scope="col">AMOUNT</th>
                        <th scope="col">ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.length > 0 && data.map((val, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{val.date}</td>
                            <td>{val.companies.name}</td>
                            <td>{val.payment_type}</td>
                            <td>{val.description}</td>
                            <td>{val.amount}</td>
                            <td>
                                <Link>  <FontAwesomeIcon className='link-warning' icon={faCircleInfo} /></Link> | <Link to='/payment/edit' state={val}>  <FontAwesomeIcon className='link-success' icon={faEdit} /></Link>  | <Link onClick={() => handleDeleteField(val.id)}><FontAwesomeIcon className='link-danger' icon={faTrash} /></Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ViewPayment
