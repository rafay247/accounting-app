import React, { useState } from 'react'
import * as CompanyApi from '../../api/companyApi'
import { useLocation } from "react-router-dom"

const EditCompany = () => {

    const location = useLocation()
    const [editValue, setEditValue] = useState(location.state)
    const [selectedOption, setSelectedOption] = useState(editValue.type)

    const handleEdit = async (e) => {
        e.preventDefault()
        const payload = {}
        payload.id = location.state.id
        payload.name = e.target.name.value
        payload.opening_balance = e.target.opening_balance.value
        payload.mobile = e.target.mobile.value
        payload.telephone = e.target.telephone.value
        payload.type = selectedOption
        await CompanyApi.editCompany(payload)
        alert('updated successfully')
        window.location.assign('/company/view')
    }

    return (

        <div className='container mt-5'>
            <div className='card'>
                <div className='bg-dark card-header text-center'>
                    <h2 style={{ color: 'navajowhite' }}>Company</h2>
                </div>
                <div className='card-body'>
                    <form onSubmit={handleEdit}>

                        <div className='row mb-3'>
                            <div className='col-6'>
                                <div className="form-check">
                                    <input className="form-check-input"
                                        type="radio"
                                        name="selected_radio"
                                        value="sales"
                                        checked={selectedOption === 'sales'}
                                        onChange={(event) => setSelectedOption(event.target.value)}
                                    />
                                    <label className="form-check-label" htmlFor="sales">
                                        Sales
                                    </label>
                                </div>
                            </div>

                            <div className='col-6'>
                                <div className="form-check">
                                    <input className="form-check-input"
                                        type="radio"
                                        name="selected_radio"
                                        value="purchase"
                                        checked={selectedOption === 'purchase'}
                                        onChange={(event) => setSelectedOption(event.target.value)}
                                    />
                                    <label className="form-check-label" htmlFor="purchase">
                                        Purchase
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className='col-6'>
                                <label htmlFor="name" className="form-label">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    placeholder="Enter company name"
                                    value={editValue.name}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='col-6'>
                                <label htmlFor="openingBalance" className="form-label">
                                    Opening Balance
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="opening_balance"
                                    placeholder="Enter opening balance"
                                    value={editValue.opening_balance}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    required

                                />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className='col-6'>
                                <label htmlFor="mobileNo" className="form-label">
                                    Mobile
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="mobile"
                                    placeholder="Enter mobile number"
                                    value={editValue.mobile}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    required
                                />

                            </div>
                            <div className='col-6'>
                                <label htmlFor="mobileNo" className="form-label">
                                    Telephone                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="telephone"
                                    placeholder="Enter telephone number"
                                    value={editValue.telephone}
                                    onChange={(e) => setEditValue(e.target.value)}
                                />

                            </div>
                        </div>

                        <div className="mb-3">
                        </div>
                        <div className='card-footer text-center'>
                            <button type="submit" className=" btn btn-sm btn-warning w-25">Submit</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default EditCompany