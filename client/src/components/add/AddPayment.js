import React, { useState, useEffect } from 'react'
import * as PaymentApi from '../../api/paymentApi'
import * as CompanyApi from '../../api/companyApi'
import moment from 'moment'

const AddPayment = () => {

  const [company_id, setCompanyId] = useState('')
  const [companyOption, setCompanyOption] = useState([])
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'))

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = {}
    payload.date = date
    payload.payment_type = e.target.selected_radio.value
    payload.company_id = company_id
    payload.description = e.target.description.value
    payload.amount = e.target.amount.value
    await PaymentApi.createPayment(payload)
    alert('payment created successfully')
    e.target.reset()
  }

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
  useEffect(() => {
    getAllCompanies()
  }, [])


  return (
    <div className='container mt-5'>
      <form onSubmit={handleSubmit}>
        <div className='card'>
          <div className='bg-dark card-header text-center'>
            <h2 style={{ color: 'navajowhite' }}>Payment</h2>
          </div>
          <div className='card-body'>

            <div className='row'>
              <div className='col-6'>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="selected_radio" id="pay" value="pay" defaultChecked />
                  <label className="form-check-label" htmlFor="pay">
                    Pay
                  </label>
                </div>
              </div>

              <div className='col-6'>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="selected_radio" id="receive" value="receive" />
                  <label className="form-check-label" htmlFor="receive">
                    Receive
                  </label>
                </div>
              </div>
            </div>

            <div className='row'>
              <div className='col-6 mt-3'>
                <label htmlFor="date" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  name='date'
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div className='col-6 mt-3'>
                <label htmlFor="company_name" className="form-label">
                  Company Name
                </label>
                <select
                  className="form-select"
                  placeholder='Select type'
                  value={company_id}
                  required
                  onChange={(e) => setCompanyId(e.target.value)}
                >
                  {companyOption.map((item) => {
                    return <option value={item.value}>{item.label}</option>
                  })}
                </select>
              </div>
              <div className='col-6 my-3'>
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  rows={3}
                  type="text"
                  className="form-control"
                  name='description'
                  placeholder="Enter Description"
                  required
                />
              </div>
              <div className='col-6 my-3'>
                <label htmlFor="amount" className="form-label">
                  Amount
                </label>
                <input
                  type="Number"
                  name='amount'
                  className="form-control"
                  placeholder="Enter amount"
                  required
                />
              </div>
            </div>
          </div>
          <div className='card-footer mt-3 text-center'>
            <button type="submit" className=" btn btn-sm btn-warning w-25">Submit</button>
          </div>
        </div>
      </form>

    </div>
  )
}

export default AddPayment
