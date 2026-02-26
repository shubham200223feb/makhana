import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='w-full fixed top-0 left-0 z-50 backdrop-blur-lg bg-white/30 shadow-lg'>
      <div className='w-full flex items-center justify-between'>
        <div><img className='rounded-full h-[4vw]' src='/makhanalogo.jpg'/></div>
        <div className='flex items-center gap-5'>
            <div><Link to={"/"}>Home</Link></div>
            <div><Link to={"/types"}>Types</Link></div>
            <div><Link to={"/account"}>Account</Link></div>
            <div><Link to={"/product"}>Product</Link></div>
            <div>About....</div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
