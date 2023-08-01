import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import * as ProductApi from '../../api/productApi'

const AddProduct = () => {
  const [fields, setFields] = useState([])
  const [addValue, setAddValue] = useState('')


  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = {}
    payload.name = e.target.name.value
    payload.old_stock = e.target.old_stock.value
    payload.alternate_names = JSON.stringify(fields)
    console.log(payload)
    await ProductApi.createProduct(payload)
    alert('created successfully')
    e.target.reset()
    setFields([])

  }

  const handleAddField = () => {
    console.log('addValue', addValue)
    if (addValue !== '' && fields.length < 10) {
      setFields([...fields, addValue])
      setAddValue('')
    }
  }

  const handleDeleteField = (index) => {
    const updatedFields = [...fields]
    updatedFields.splice(index, 1)
    setFields(updatedFields)
  }
  return (
    <div className='container mt-5'>
      <form onSubmit={handleSubmit}>
        <div className='card'>
          <div className='bg-dark card-header text-center'>
            <h2 style={{ color: 'navajowhite' }}>Product</h2>
          </div>
          <div className='card-body'>
            <div className='row'>
              <div className='col-6 mt-3'>
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter product name"
                  name='name'
                  required
                />
              </div>
              <div className='col-6 mt-3'>
                <label htmlFor="old_stock" className="form-label">
                  Old Stock
                </label>
                <input
                  type="Number"
                  className="form-control"
                  placeholder="Enter old stock"
                  name='old_stock'
                  required
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-6 offset-3">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Add alternate name"
                    value={addValue}
                    onChange={(e) => setAddValue(e.target.value)}
                  />
                  <button type="button" onClick={handleAddField} className=" btn btn-success"><FontAwesomeIcon icon={faPlus} /></button>
                </div>
              </div>
            </div>
            <div className="row mt-1">
              {fields.map((value, index) => (
                <div key={index} className="col-6 offset-3">
                  <div className="input-group mb-3">
                    <input type="text" className="form-control" value={value} readOnly />
                    <button type='button' className="btn btn-danger" onClick={() => handleDeleteField(index)} ><FontAwesomeIcon icon={faTrash} /></button>
                  </div>
                </div>
              ))}
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

export default AddProduct
