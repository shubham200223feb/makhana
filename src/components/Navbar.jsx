import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='w-full'>
      <div className='w-full flex items-center justify-between'>
        <div><img className='rounded-full h-[4vw]' src='../../public/makhanalogo.jpg'/></div>
        <div className='flex items-center gap-5'>
            <div><a href='#home'>Home</a></div>
            <div><Link to={"/types"}>Types</Link></div>
            <div>Feedback</div>
            <div>About....</div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
