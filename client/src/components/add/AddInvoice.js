import React, { useState, useEffect } from "react"
import * as CompanyApi from '../../api/companyApi'
import * as InvoiceApi from '../../api/invoiceApi'
import moment from 'moment'

const AddInvoice = () => {
  // One time
  const [date, setDate] = useState((moment().format('YYYY-MM-DD')))
  const [ref_no, setRefNumber] = useState("")
  const [transportation_cost, setTransportationCost] = useState(0)
  const [grandTotal, setGrandTotal] = useState("")
  const [type, setInvoiceType] = useState("sales")
  const [company_id, setCompanyId] = useState("")
  const [companyOption, setCompanyOption] = useState([])

  // Multiple
  const [item_data, setItemData] = useState([
    {
      product_name: "",
      qty: "",
      packing: "",
      rate: "",
      total_weight: "",
      total_amount: "",
    },
  ])

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


  const handleAddItem = () => {
    setItemData([
      ...item_data,
      {
        product_name: "",
        qty: "",
        packing: "",
        rate: "",
        total_weight: "",
        total_amount: "",
      },
    ])
  }

  const handleRemoveItem = (index) => {
    const list = [...item_data]
    list.splice(index, 1)
    setItemData(list)
  }

  const handleChange = (e, index) => {
    const { name, value } = e.target
    const list = [...item_data]
    list[index][name] = value
    list[index]["total_weight"] = list[index].packing * list[index].qty
    list[index]["total_amount"] = list[index].total_weight * list[index].rate
    setItemData(list)
    setGrandTotal(calculateGrandTotal(item_data, transportation_cost))
  }

  let payload = {}

  const handleSubmit = async (event) => {
    event.preventDefault()

    payload = { date, ref_no, type, company_id, item_data, transportation_cost }
    await InvoiceApi.createInvoice(payload)
    alert("Invoice submitted successfully!")

    setRefNumber("")
    setCompanyId("")
    setDate((moment().format('YYYY-MM-DD')))
    setGrandTotal("")
    setItemData([
      {
        product_name: "",
        qty: "",
        packing: "",
        rate: "",
        total_weight: "",
        total_amount: "",
      },
    ])
    setTransportationCost(0)
  }

  const calculateGrandTotal = (items, transportation_cost) => {
    return items.reduce(
      (total, item) => total + item.total_amount,
      Number(transportation_cost)
    )
  }

  return (
    // Displayed only one time
    <div className="container mt-5">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="card">
          <div className="bg-dark card-header text-center">
            <h2 style={{ color: "navajowhite" }}>Invoice</h2>
          </div>
          <div className="card-body">
            <div className="row mb-4">
              <div className="col form-check ms-4">
                <input
                  className="form-check-input"
                  type="radio"
                  name="invoice"
                  id="sales-invoice"
                  value="sales"
                  onChange={(e) => setInvoiceType(e.target.value)}
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="sales-invoice">
                  Sales Invoice
                </label>
              </div>

              <div className="col form-check offset-6">
                <input
                  className="form-check-input"
                  type="radio"
                  name="invoice"
                  id="purchase-invoice"
                  value="purchase"
                  onChange={(e) => setInvoiceType(e.target.value)}
                />
                <label className="form-check-label" htmlFor="purchase-invoice">
                  Purchase Invoice
                </label>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-3">
                <label htmlFor="date" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  required
                />
              </div>

              <div className="col-3 offset-6">
                <label htmlFor="ref_no" className="form-label">
                  Ref #
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="ch-ref_no"
                  placeholder="Enter ref number"
                  value={ref_no}
                  onChange={(event) => setRefNumber(event.target.value)}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col mb-4">
                <label htmlFor="company-name" className="form-label">
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
            </div>
            {/* Printed according to number of items items ================================================== */}
            {item_data.map((val, i) => (
              <div key={i}>
                <div className="row mb-4 ">
                  <div className="col-2">
                    <label htmlFor="product_name" className="form-label">
                      Product Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="product_name"
                      name="product_name"
                      placeholder="Enter product name"
                      value={val.product_name}
                      onChange={(e) => handleChange(e, i)}
                      required
                    />
                  </div>
                  <div className="col-1">
                    <label htmlFor="qty" className="form-label">
                      Quantity
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="qty"
                      name="qty"
                      value={val.qty}
                      onChange={(e) => {
                        handleChange(e, i)
                      }}
                      required
                    />
                  </div>
                  <div className="col-1 text-center">x</div>

                  <div className="col-1">
                    <label htmlFor="packing" className="form-label">
                      Packing
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="packing"
                      name="packing"
                      value={val.packing}
                      onChange={(e) => handleChange(e, i)}
                      required
                    />
                  </div>
                  <div className="col-1 text-center">=</div>

                  <div className="col-1">
                    <label htmlFor="total_weight" className="form-label">
                      Total_weight
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="total_weight"
                      name="total_weight"
                      value={val.qty * val.packing}
                      readOnly
                    />
                  </div>
                  <div className="col-1 text-center">x</div>

                  <div className="col-1">
                    <label htmlFor="rate" className="form-label">
                      Rate
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="rate"
                      name="rate"
                      value={val.rate}
                      onChange={(e) => handleChange(e, i)}
                      required
                    />
                  </div>
                  <div className="col-1 text-center">=</div>
                  <div className="col-2">
                    <label htmlFor="total-amount" className="form-label">
                      Total Amount
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="total-amount"
                      name="total-amount"
                      value={val.total_weight * val.rate}
                      readOnly
                    />
                  </div>
                </div>
                <div className="row mb-4 ">
                  {item_data.length !== 1 && (
                    <div className="col text-center">
                      <button
                        onClick={() => handleRemoveItem(i)}
                        type="button"
                        className="w-25 btn btn-outline-danger"
                      >
                        Remove Item
                      </button>
                    </div>
                  )}
                  {item_data.length - 1 === i && item_data.length < 5 && (
                    <div className="col text-center">
                      <button
                        onClick={handleAddItem}
                        type="button"
                        className="w-25 btn btn-outline-primary"
                      >
                        Add More Items
                      </button>
                    </div>
                  )}

                  {item_data.length !== 1 && i !== item_data.length - 1 && (
                    <hr className="mt-4"></hr>
                  )}
                </div>
              </div>
            ))}

            <hr></hr>
            <div className="row mb-4">
              <div className="col-3">
                <label htmlFor="transportation-cost" className="form-label">
                  Transportation Cost
                </label>
              </div>

              <div className="col-3 offset-6">
                <input
                  type="number"
                  className="form-control"
                  id="transportation-cost"
                  placeholder="Enter transportation cost"
                  value={transportation_cost}
                  onChange={(event) => {
                    setTransportationCost(event.target.value)
                    setGrandTotal(
                      calculateGrandTotal(item_data, event.target.value)
                    )
                  }}
                />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-3">
                <label htmlFor="transportation-cost" className="form-label">
                  Grand Total
                </label>
              </div>
              <div className="col-3 offset-6">
                <input
                  type="number"
                  className="form-control"
                  id="transportation-cost"
                  value={grandTotal}
                  readOnly
                />
              </div>
            </div>
            {/* ============================================================= */}
          </div>
          <div className="card-footer text-center">
            <input type="submit" className="btn btn-sm btn-warning w-25" />
          </div>
        </div>
      </form>
    </div >
  )
}

export default AddInvoice
