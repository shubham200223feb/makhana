import React, { useEffect, useState } from 'react'
import { MdAdd } from "react-icons/md";
import { GrFormSubtract } from "react-icons/gr";
import axios from 'axios';
import { toast } from 'react-toastify';
const Items = (props) => {
    const[count ,setcount]=useState(0);
    const [lodeing,setlodeing]=useState(false);
    useEffect(async()=>{
try{
const response=await axios.post("https://makhanabackend.onrender.com/api/cart/get",{productname:props.des});
const data = response.data;
console.log(quantity);
setcount(data.quantity);
}catch(error){
console.log(error);
}
    },[])
    const Add=async()=>{
      setlodeing(true);
       
        console.log(count);

       try{ const responses=await axios.post("https://makhanabackend.onrender.com/api/cart/add",{productname:props.des},{withCredentials:true})
       console.log("sharma")
       const data = responses.data;
        console.log("shubham");
        console.log(data);
        if(data.sucess==false ){
          console.log(data);
        }
        if(data.sucess){
          setlodeing(false);
           setcount((c)=>{
            c=c+1;
            return c;

        });
          toast.success("product added")
        }}catch(error){
          setlodeing(false);
      
          toast.error("errro while product add")
          console.log("error while Addeing the product",error);
          return console.log("error while addeing item",error);
        }

      }
    const Sub=async()=>{
    if(count<1){
      return 
    }
      

else{
  setlodeing(true);
  try{ const responses=await axios.post("https://makhanabackend.onrender.com/api/cart/sub",{productname:props.des},{withCredentials:true})
        const data = responses.data;
        if(data.sucess){
          setlodeing(false);
                
          setcount((c)=>{
              if(c>=1){
              
              c=c-1;}
              return c;

          })
          toast.success("product subtract")
        }}catch(error){
          setlodeing(false);
          toast.error("errro while product sub")
          console.log("error while subtracting the product",error);
          return console.log("error while subtracting item",error);
        }


    }}
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
     { lodeing?"plss wait"   :  (<><button className="cursor-pointer rounded-full bg-white  transition duration-300 hover:scale-110" onClick={Add}><MdAdd /></button>
        <p className="text-3xl text-white">{props.prices}</p>
        <button className=" cursor-pointer  rounded-full bg-white  transition duration-300 hover:scale-110" onClick={Sub}><GrFormSubtract /></button>
       {count>0?<p>{count}</p>:''}</>)}
      </div>

    </div>
  );
};

export default Items;