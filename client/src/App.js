import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/general/Navbar'
import Footer from './components/general/Footer'
import Dashboard from './components/general/Dashboard'
import AddCompany from './components/add/AddCompany'
import ViewCompany from './components/view/ViewCompany'
import AddProduct from './components/add/AddProduct'
import ViewProduct from './components/view/ViewProduct'
import AddInvoice from './components/add/AddInvoice'
import AddReturnInvoice from './components/add/AddReturnInvoice'
import ViewReturnInvoice from './components/view/ViewReturnInvoice'
import AddPayment from './components/add/AddPayment'
import ViewPayment from './components/view/ViewPayment'

import EditCompany from './components/edit/EditCompany'
import EditPayment from './components/edit/EditPayment'
import EditProduct from './components/edit/EditProduct'
import EditInvoice from './components/edit/EditInvoice'

import ViewReport from './components/view/ViewReport'

import './styles.css'

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route exact path="/company/add" element={<AddCompany />} />
        <Route exact path="/company/view" element={<ViewCompany />} />
        <Route exact path="/company/edit" element={< EditCompany />} />
        <Route exact path="/company/report" element={< ViewReport />} />

        <Route exact path="/payment/add" element={<AddPayment />} />
        <Route exact path="/payment/view" element={<ViewPayment />} />
        <Route exact path="/payment/edit" element={<EditPayment />} />

        <Route exact path="/product/add" element={<AddProduct />} />
        <Route exact path="/product/view" element={<ViewProduct />} />
        <Route exact path="/product/edit" element={<EditProduct />} />

        <Route exact path="/invoice/add" element={<AddInvoice />} />
        <Route exact path="/invoice/edit" element={<EditInvoice />} />

        <Route exact path="/invoice/add/return" element={<AddReturnInvoice />} />
        <Route exact path="/invoice/view/return" element={<ViewReturnInvoice />} />

      </Routes>
      <Footer />
    </Router>
  )
}

export default App