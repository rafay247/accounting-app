import React from 'react'
import * as CompanyApi from '../../api/companyApi'

const Create = () => {

    // const hideMessage = (timout = 2500) => setTimeout(() => $('message').html(''), timout)

    const toggleMessageIcon = {
        success: 'check',
        danger: 'times'
    }


    // const toggleMessage = (message, type, autoClose = true, timeout = 2500) => {
    //     $('#message').html(`
    // <div class = "alert alert-light alert-dismissible fade show rounded shadow border-${type}" role="alert">
    //    <i class = "fas fa-${toggleMessageIcon[type]}-circle mr-2 text-${type}"></i>${message}
    //    <button type="button" class= "close" data-dismiss="alert" aria-label="Close">
    //       <span aria-hidden="true">&times;</span>
    //    </button>
    // </div>
    // `)
    //     autoClose && hideMessage(timeout)
    // }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const payload = {}
        payload.name = event.target.name.value || ''
        payload.mobile = event.target.mobile.value || ''
        payload.telephone = event.target.telephone.value || ''
        payload.opening_balance = event.target.opening_balance.value || ''
        payload.type = event.target.selected_radio.value
        toggleMessage('success', 'company created')
        await CompanyApi.createCompany(payload)
        // alert('created successfully !')
        event.target.reset()

    }
    const toggleMessage = () => {
        return (
            <div class="alert alert-success" role='alert' >
                <strong>Warning!</strong> This alert box could indicate a warning that might need attention.
            </div >
        )
    }
    return (
        <div className='container mt-5'>
            <form onSubmit={handleSubmit}>
                <div className='card'>
                    <div className='bg-dark card-header text-center'>
                        <h2 style={{ color: 'navajowhite' }}>Company</h2>
                    </div>
                    <div className='card-body'>
                        <div className='row mb-3'>
                            <div className='col-6'>
                                <div className="form-check">
                                    <input className="form-check-input"
                                        type="radio"
                                        name="selected_radio"
                                        id="sales"
                                        value="sales" defaultChecked />
                                    <label className="form-check-label" htmlFor="sales">
                                        Sales
                                    </label>
                                </div>
                            </div>

                            <div className='col-6'>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="selected_radio" id="purchase" value="purchase" />
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
                                />

                            </div>
                        </div>
                    </div>
                    <div className='card-footer text-center'>
                        <button type="submit" className=" btn btn-sm btn-warning w-25">Submit</button>
                    </div>
                </div>
            </form>
        </div >
    )
}

export default Create
