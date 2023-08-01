import React, { useState, useEffect } from 'react'
import * as CompanyApi from '../../api/companyApi'
import * as InvoiceApi from '../../api/invoiceApi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faCircleInfo, faRefresh } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'


const Dashboard = () => {

    let query = new URLSearchParams()
    const [showData, setShowData] = useState([])
    const [company_id, setCompanyName] = useState('')
    const [companyOption, setCompanyOption] = useState([])

    const [typeValue, setTypeValue] = useState('')

    const type = [
        { value: '', label: 'Select type' },
        { value: 'sales', label: 'Sales' },
        { value: 'purchase', label: 'Purchase' }
    ]
    const getAllCompanies = async () => {

        const response = await CompanyApi.getCompany()
        const allCompany = response.data.map((val) => {
            return (
                { value: val.id, label: val.name }
            )
        })
        allCompany.unshift({ value: '', label: 'Select company' })
        setCompanyOption(allCompany)
    }
    const getAllInvoice = async (query) => {
        const response = await InvoiceApi.getInvoices(query.toString())
        // console.log('response', response)
        setShowData(response.data)
    }
    const handleRefresh = () => {
        getAllInvoice(query)
    }
    const handleDelete = async (ref_no) => {
        if (window.confirm("Are you sure you want to delete this invoice !")) {
            setShowData((prev) => {
                prev = prev.filter(x => x.ref_no !== ref_no)
                return [...prev]
            })
            const response = await InvoiceApi.deleteInvoice(ref_no)
            console.log(response)
        }
    }
    const handleFilter = () => {
        if (typeValue !== '') query.append('type', `${typeValue}`)
        if (company_id !== '') query.append('company_id', `${company_id}`)
        getAllInvoice(query)
    }

    useEffect(() => {
        getAllInvoice(query)
        getAllCompanies()
    }, [])

    return (
        <div className='container-fluid'>
            <div className='row g-2 mt-2'>
                <div className='col-3'>
                    <select
                        className="form-select"
                        placeholder='Select type'
                        value={company_id}
                        onChange={(e) => setCompanyName(e.target.value)}
                    >
                        {companyOption.map((item) => {
                            return <option value={item.value}>{item.label}</option>
                        })}
                    </select>
                </div>
                <div className='col-3'>
                    <select
                        className="form-select"
                        placeholder='Select type'
                        value={typeValue}
                        onChange={(e) => setTypeValue(e.target.value)}
                    >
                        {type.map((item) => {
                            return <option value={item.value}>{item.label}</option>
                        })}
                    </select>
                </div>
                <div className='col-2 offset-4'>
                    <button type='button' style={{ backgroundColor: '#593196', color: 'whitesmoke' }} onClick={handleFilter} className='btn w-100 fw-bold'>Filter</button>
                </div>
            </div>

            <div className='card mt-3'>
                <div className='bg-dark card-header fw-bold py-2'>
                    <div className='row'>
                        <div className='col-6 offset-5 mt-2'>
                            <h2 style={{ color: 'navajowhite' }}>GENERAL JOURNAL</h2>
                        </div>
                        <div className='col-1'>
                            <button type='button' style={{ color: 'navajowhite', marginLeft: '80px' }} className='btn mt-2' title='REFRESH' onClick={handleRefresh}><FontAwesomeIcon icon={faRefresh} /></button>
                        </div>
                    </div>
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
                            <td>{item.companies?.name}</td>
                            <td>{item.ref_no}</td>
                            <td>{item.date}</td>
                            <td style={(item.type === 'purchase') ? { backgroundColor: '#ABE188' } : { backgroundColor: '#F7EF99' }}>{item.type}</td>
                            <td style={(item.product_name === 'tranportation cost') ? { backgroundColor: 'lightblue' } : { backgroundColor: 'white' }}>{item.product_name}</td>
                            <td>{item.qty}</td>
                            <td>{item.packing}</td>
                            <td>{item.total_amount}</td>
                            <td>
                                {(item.product_name === 'tranportation cost') && [
                                    <Link className='px-1'><FontAwesomeIcon className='link-warning' icon={faCircleInfo} /></Link>,
                                    '|', <Link className='px-1' to='/invoice/edit' state={item.ref_no} ><FontAwesomeIcon className='link-success' icon={faEdit} /></Link>,
                                    '|', <Link className='px-1' onClick={() => handleDelete(item.ref_no)} ><FontAwesomeIcon className='link-danger' icon={faTrash} /></Link>
                                ]
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >

    )
}

export default Dashboard