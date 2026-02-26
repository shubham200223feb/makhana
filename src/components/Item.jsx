import React, { useState } from 'react'
import { MdAdd } from "react-icons/md";
import { GrFormSubtract } from "react-icons/gr";
const Items = (props) => {
    const[count ,setcount]=useState(0);
    const Add=()=>{
        setcount((c)=>{
            c=c+1;
            return c;

        })
    }
    const Sub=()=>{
setcount((c)=>{
    if(c>=1){
    c=c-1;}
    return c;
})
    }
  return (
    
    <div className=" flex flex-col h-[43vh] w-[29vw]">

     
      <div className=" h-[38vh] w-full flex-col justify-between items-center">
        <img
          className="h-[33vh] w-full object-cover overflow-hidden rounded-4xl transition duration-300 hover:scale-105"
          src={props.image}
        />
    <p className='h-[5vh] w-full  text-gray-600'>{props.des}</p>
      </div>

      <div className="h-[5vh] w-full bg-amber-500 flex justify-around items-center rounded-b-2xl">
        <button className="cursor-pointer rounded-full bg-white px-3 py-1  transition duration-300 hover:scale-110" onClick={Add}><MdAdd /></button>
        <p className="text-3xl text-white">{props.prices}</p>
        <button className=" cursor-pointer  rounded-full bg-white px-3 py-1 transition duration-300 hover:scale-110" onClick={Sub}><GrFormSubtract /></button>
       {count>0?<p>{count}</p>:''}
      </div>

    </div>
  );
};

export default Items;