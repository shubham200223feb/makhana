import React from 'react'

import Home from './pages/Home'
import Type from './pages/Type'
import { Route, Routes } from 'react-router-dom'
import Account from './pages/Account'

const App = () => {
  return (
    <div>
   <Routes>
    <Route path='/' element={<Home/>}></Route>
    <Route path ="/types" element={<Type/>}></Route>
    <Route path='/account' element={<Account/>}></Route>
   </Routes>
    </div>
  )
}

export default App
