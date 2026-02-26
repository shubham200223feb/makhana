import React from 'react'

import Home from './pages/Home'
import Type from './pages/Type'
import { Route, Routes } from 'react-router-dom'
import Account from './pages/Account'
import { ToastContainer } from 'react-toastify'
 import "react-toastify/dist/ReactToastify.css"
import Product from './pages/Product'

const App = () => {
  return (
    <div>
      <ToastContainer/>
   <Routes>
    <Route path='/' element={<Home/>}></Route>
    <Route path ="/types" element={<Type/>}></Route>
    <Route path='/account' element={<Account/>}></Route>
    <Route path='/product' element={<Product/>}></Route>
   </Routes>
    </div>
  )
}

export default App
