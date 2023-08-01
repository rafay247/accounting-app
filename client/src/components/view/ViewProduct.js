import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import * as ProductApi from '../../api/productApi'
import { useEffect, useState } from 'react'
const ViewProduct = () => {

  const [data, setData] = useState([])

  const getAllProducts = async () => {
    const response = await ProductApi.getProduct()
    console.log('product', response)
    setData(response.data)
  }
  const handleDeleteField = async (id) => {
    if (window.confirm("Are you sure you want to delete this product !")) {
      setData((prev) => {
        prev = prev.filter(x => x.id !== id)
        return [...prev]
      })
      const response = await ProductApi.deleteProduct(id)
      console.log(response)
    }
  }

  useEffect(() => {
    getAllProducts()
  }, [])


  return (
    <div className='container-fluid'>
      <div className='card mt-5'>
        <div className='bg-dark card-header text-center fw-bold'>
          <h2 style={{ color: 'navajowhite' }}>PRODUCTS</h2>
        </div>

      </div>
      <table className="table table-hover table-xl table-bordered text-center">
        <thead className='table-light fw-bolder'>
          <tr>
            <th scope="col" style={{ width: '3%' }}>S.no</th>
            <th scope="col">NAME</th>
            <th scope="col">OLD STOCK</th>
            <th scope="col">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 && data.map((val, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{val.name}</td>
              <td>{val.old_stock}</td>
              <td>
                <Link>  <FontAwesomeIcon className='link-warning' icon={faCircleInfo} /></Link> | <Link to='/product/edit' state={val}>  <FontAwesomeIcon className='link-success' icon={faEdit} /></Link>  | <Link onClick={() => handleDeleteField(val.id)}><FontAwesomeIcon className='link-danger' icon={faTrash} /></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewProduct;
