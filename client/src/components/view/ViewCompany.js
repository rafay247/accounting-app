import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import * as CompanyApi from '../../api/companyApi'
const ViewCompany = () => {

    const [data, setData] = useState([])

    const getAllComapany = async () => {
        const response = await CompanyApi.getCompany()
        setData(response.data)
    }
    const handleDeleteField = async (id) => {
        if (window.confirm("Are you sure you want to delete this company !")) {
            setData((prev) => {
                prev = prev.filter(x => x.id !== id)
                return [...prev]
            })
            const response = await CompanyApi.deleteCompany(id)
            console.log(response)
        }
    }

    useEffect(() => {
        getAllComapany()
    }, [])

    return (
        <div className='container-fluid'>
            <div className='card mt-5'>
                <div className='bg-dark card-header text-center fw-bold'>
                    <h2 style={{ color: 'navajowhite' }}>COMPANY</h2>
                </div>

            </div>
            <table className="table table-hover table-xl table-bordered text-center">
                <thead className='table-light fw-bolder'>
                    <tr>
                        <th scope="col" style={{ width: '3%' }}>S.no</th>
                        <th scope="col">NAME</th>
                        <th scope="col">OPENING BALANCE</th>
                        <th scope="col">MOBILE</th>
                        <th scope="col">TELEPHONE</th>
                        <th scope="col">TYPE</th>
                        <th scope="col">ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.length > 0 && data.map((val, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{val.name}</td>
                            <td>{val.opening_balance}</td>
                            <td>{val.mobile}</td>
                            <td>{val.telephone}</td>
                            <td>{val.type}</td>
                            <td>
                                <Link>  <FontAwesomeIcon className='link-warning' icon={faCircleInfo} /></Link> | <Link
                                    to='/company/edit' state={val} >  <FontAwesomeIcon className='link-success' icon={faEdit} /></Link>  | <Link><FontAwesomeIcon onClick={() => handleDeleteField(val.id)} className='link-danger' icon={faTrash} /></Link>
                            </td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ViewCompany
