import React, { useState, useEffect } from 'react'
import * as CompanyApi from '../../api/companyApi'
import moment from 'moment'


const ViewReport = () => {

    const [fromDate, setFromDate] = useState(moment().subtract(3, 'M').format('YYYY-MM-DD'))
    const [toDate, setToDate] = useState(moment().format('YYYY-MM-DD'))
    const [data, setData] = useState([])
    const [tcp, setTcp] = useState('')

    const [company_name, setCompanyName] = useState('')
    const [companyOption, setCompanyOption] = useState([])

    let fliterData = []

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
    const dateFilter = (start, end, data) => {
        const dataArr = data.concat()
        const startDate = new Date(start)
        const endDate = new Date(end)

        const filteredArr = dataArr.filter((obj) => {
            const objDate = new Date(obj.date)
            return objDate >= startDate && objDate <= endDate
        })
        return filteredArr
    }

    const handleFilter = async () => {
        if (company_name === '') {
            alert('Select Company !')
        }
        else {
            const response = await CompanyApi.getReport(company_name)
            fliterData = dateFilter(fromDate, toDate, response.data)
            fliterData.unshift(response.data[0])
            console.log('beforefilter', fliterData)
            setTcp("TOTAL COMPANY BALANCE")
            setData(fliterData)
        }
    }

    useEffect(() => {
        getAllCompanies()
    }, [])

    return (
        <div className='container-fluid'>
            <div className='row mt-3'>
                <div className='col-3'>
                    <label htmlFor="name" className="fw-bold text-muted form-label">
                        From Date
                    </label>
                    <input
                        type="date"
                        className="form-control form-control-sm"
                        name="from_date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        required
                    />
                </div>
                <div className='col-3'>
                    <label htmlFor="to_ date" className="fw-bold text-muted form-label">
                        To Date
                    </label>
                    <input
                        type="date"
                        className="form-control form-control-sm"
                        name="to_date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        required
                    />
                </div>
                <div className='col-1 offset-5 text-end'>
                    <button style={{ marginTop: '25%' }} type='button' className='w-50 btn-sm btn btn-success'>Print</button>
                </div>
            </div>

            <div className='row mt-2'>
                <div className='col-6'>
                    <select
                        className="form-select form-select-sm"
                        placeholder='Select type'
                        value={company_name}
                        onChange={(e) => setCompanyName(e.target.value)}
                    >
                        {companyOption.map((item) => {
                            return <option value={item.value}>{item.label}</option>
                        })}
                    </select>
                </div>
                <div className='col-2 offset-4'>
                    <button type='button' style={{ backgroundColor: '#343a40', color: 'whitesmoke' }} onClick={handleFilter} className='btn w-100 btn-sm fw-bold'>Filter</button>
                </div>
            </div>
            <div className='card mt-3'>

                <div className="container">
                    <div className="row mt-1">
                        <div className="text-center col-6 offset-3 fw-bolder">
                            <h1 style={{ color: 'rgb(89, 49, 150)', fontSize: '47px' }}>RAAZ</h1>
                        </div>
                    </div>
                    <div className='row my-1'>
                        <div className="col-4 offset-1">
                            <strong>FROM:</strong> {fromDate}
                        </div>
                        <div className="col-3 offset-4">
                            <strong>TO:</strong>  {toDate}
                        </div>
                    </div>
                </div>

                <div className='card mt-3'>
                    <div className='bg-ligh card-header fw-bold'>
                        <h3 >{company_name}</h3>
                    </div>
                </div>
                <div className='row my-3 mx-3 fw-bolder justify-content-around'>
                    <div className='col-11'>OPENING BALANCE</div>
                    <div className=' col-1 text-end'>{data[0]?.balance}</div>
                </div>
                <table className="table table-hover table-sm table-bordered text-center">
                    <thead className='table-light'>
                        <tr>
                            <th scope="col" colSpan='1'>DATE</th>
                            <th scope="col">REF #</th>
                            <th scope="col">TYPE</th>
                            <th scope="col">PRODUCT</th>
                            <th scope="col">QTY</th>
                            <th scope="col">PACKING</th>
                            <th scope="col">TOTAL(kg)</th>
                            <th scope="col">RATE</th>
                            <th scope="col">AMOUNT</th>
                            <th scope="col">CREDIT</th>
                            <th scope="col">DEBIT</th>
                            <th scope="col">BALANCE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.length > 0 && data.map((val, i) => (
                            <tr key={i}>
                                <td>{val.date}</td>
                                <td>{val.ref_no}</td>
                                <td>{val.type}</td>
                                <td>{val.product_name}</td>
                                <td>{val.qty}</td>
                                <td>{val.packing}</td>
                                <td>{val.total_weight}</td>
                                <td>{val.rate}</td>
                                <td>{val.total_amount}</td>
                                <td className='text-success fw-bold'>{val.credit}</td>
                                <td className='text-danger fw-bold'>{val.debit}</td>
                                <td>{val.balance}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='row mx-3 my-3 fw-bolder justify-content-around'>
                    <div className='col-11'>{tcp}</div>
                    <div className=' col-1 text-end'>{data[data.length - 1]?.balance}</div>
                </div>
            </div >
        </div>
    )
}

export default ViewReport