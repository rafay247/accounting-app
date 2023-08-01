import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faReceipt, faCartShopping, faFile, faMoneyBill, faPowerOff, faHome } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const Navbar = () => {

  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
          <Link className="navbar-brand mr-25" to="/"> <h2>Raaz</h2></Link>
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <Link className="nav-link " to="/" role="button" aria-expanded="false">
                <FontAwesomeIcon icon={faHome} /> Home
              </Link>
            </li>

            <li className="nav-item dropdown pl-3">
              <Link className="nav-link " to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <FontAwesomeIcon icon={faUser} />  Company
              </Link>
              <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                <li><Link className="dropdown-item" to="/company/add">Add company</Link></li>
                <li><Link className="dropdown-item" to="/company/view">Veiw company</Link></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link " to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <FontAwesomeIcon icon={faReceipt} />  Invoice
              </Link>
              <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                <li><Link className="dropdown-item" to="/invoice/add">Add invoice</Link></li>
                <li><Link className="dropdown-item" to="/invoice/add/return">Add return invoice</Link></li>
                <li><Link className="dropdown-item" to="/invoice/view/return">View return invoice</Link></li>

              </ul>
            </li>


            <li className="nav-item dropdown">
              <Link className="nav-link " to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <FontAwesomeIcon icon={faCartShopping} />  Products
              </Link>
              <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                <li><Link className="dropdown-item" to="/product/add">Add Product</Link></li>
                <li><Link className="dropdown-item" to="/product/view">View Product</Link></li>

              </ul>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link " to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <FontAwesomeIcon icon={faMoneyBill} />  Payment
              </Link>
              <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                <li><Link className="dropdown-item" to="/payment/add">Add payment</Link></li>
                <li><Link className="dropdown-item" to="/payment/view">View payment</Link></li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <Link className="nav-link " to="/company/report" role="button" aria-expanded="false">
                <FontAwesomeIcon icon={faFile} /> Report
              </Link>
            </li>

          </ul>
          <Link><FontAwesomeIcon title='logout' className='fs-4 ml-14 text-end link-warning' icon={faPowerOff} onClick={() => alert('Are you sure you want to logout')} /></Link>
        </div>
      </div>
    </nav>

  )
}

export default Navbar
