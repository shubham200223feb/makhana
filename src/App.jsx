import React from 'react'

import Home from './pages/Home'
import Type from './pages/Type'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <div>
   <Routes>
    <Route path='/' element={<Home/>}></Route>
    <Route path ="/types" element={<Type/>}></Route>
   </Routes>
    </div>
  )
}

export default App
