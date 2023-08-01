import React, { useState } from 'react'
import * as PaymentApi from '../../api/paymentApi'
import { useLocation } from "react-router-dom"

const EditPayment = () => {

    const location = useLocation()
    const [editValue, setEditValue] = useState(location.state)
    const [selectedOption, setSelectedOption] = useState(editValue.payment_type)


    const handleEdit = async (e) => {
        e.preventDefault()
        const payload = {}
        payload.data = e.target.date.value
        payload.payment_type = selectedOption
        payload.company_name = e.target.company_name.value
        payload.description = e.target.description.value
        payload.amount = e.target.amount.value
        await PaymentApi.editPayment(payload)
        alert('updated successfully')
        window.location.assign('/payment/view')

    }

    return (
        <div className='container mt-5'>
            <div className='card'>
                <div className='bg-dark card-header text-center'>
                    <h2 style={{ color: 'navajowhite' }}>Payment</h2>
                </div>
                <div className='card-body'>
                    <form onSubmit={handleEdit}>

                        <div className='row'>
                            <div className='col-6'>
                                <div className="form-check">
                                    <input className="form-check-input"
                                        type="radio"
                                        name="selected_radio"
                                        id="pay"
                                        value="pay"
                                        checked={selectedOption === 'pay'}
                                        onChange={(event) => setSelectedOption(event.target.value)}

                                    />

                                    <label className="form-check-label" htmlFor="pay">
                                        Pay
                                    </label>
                                </div>
                            </div>

                            <div className='col-6'>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio"
                                        name="selected_radio"
                                        id="receive"
                                        value="receive"
                                        checked={selectedOption === 'receive'}
                                        onChange={(event) => setSelectedOption(event.target.value)}
                                    />
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
                                    value={editValue.date}
                                    onChange={(e) => setEditValue(e.target.value)}
                                />
                            </div>
                            <div className='col-6 mt-3'>
                                <label htmlFor="company_name" className="form-label">
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter company name"
                                    name='company_name'
                                    value={editValue.company_name}
                                    onChange={(e) => setEditValue(e.target.value)}
                                />
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
                                    value={editValue.description}
                                    onChange={(e) => setEditValue(e.target.value)}
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
                                    value={editValue.amount}
                                    onChange={(e) => setEditValue(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='card-footer mt-3 text-center'>
                            <button type="submit" className=" btn btn-sm btn-warning w-25">Submit</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default EditPayment
