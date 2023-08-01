import React, { useState, useEffect } from 'react'
import * as ReturnInvoiceApi from '../../api/returnInvoiceApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
const ViewReturnInvoice = () => {

  const [showData, setShowData] = useState([])

  const getAllInvoice = async () => {
    const response = await ReturnInvoiceApi.getReturnInvoice()
    console.log('response', response)
    setShowData(response.data)
  }

  useEffect(() => {
    getAllInvoice()
  }, [])

  return (
    <div className='container-fluid'>

      <div className='card mt-5'>
        <div className='bg-dark card-header text-center fw-bold'>
          <h2 style={{ color: 'navajowhite' }}>RETURN INVOICES</h2>
        </div>
      </div>

      <table className="table table-hover table-xl table-bordered text-center">
        <thead className='table-light fw-bolder'>
          <tr>
            <th scope="col" style={{ width: '3%' }}>S.no</th>
            <th scope="col">Company</th>
            <th scope="col">Ref</th>
            <th scope="col">Date</th>
            <th scope="col">type</th>
            <th scope="col">Product</th>
            <th scope="col">Qty</th>
            <th scope="col">Packing</th>
            <th scope="col">Total</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {showData?.length > 0 && showData.map((item, i) => (
            <tr key={i + 1}>
              <td>{i + 1}</td>
              <td>{item.companies.name}</td>
              <td>{item.ref_no}</td>
              <td>{item.date}</td>
              <td>{item.type}</td>
              <td>{item.product_name}</td>
              <td>{item.qty}</td>
              <td>{item.packing}</td>
              <td>{item.total_amount}</td>
              <td>
                <Link>  <FontAwesomeIcon className='link-warning' icon={faCircleInfo} /></Link> | <Link>  <FontAwesomeIcon className='link-success' icon={faEdit} /></Link>  | <Link><FontAwesomeIcon className='link-danger' icon={faTrash} /></Link>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  )
}

export default ViewReturnInvoice