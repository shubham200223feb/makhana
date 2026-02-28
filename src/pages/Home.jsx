import React from 'react'
import Navbar from '../components/Navbar'
import Herotop from '../components/Herotop'

const Home = () => {
  return (
    <div>
       <div className='flex flex-col justify-between h-screen w-screen '>
       <Navbar/>
      <Herotop/>
    </div>
    </div>
  )
}

export default Home
