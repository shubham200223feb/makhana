import React ,{useEffect}from 'react'
import Navbar from '../components/Navbar';
import Items from '../components/Item';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Product = () => {
  const navigator = useNavigate();
  const user = localStorage.getItem("userlogin");
useEffect(() => {
    if (!user) {
      toast.info("Please login first");
      navigator("/account");
    }
  }, [user, navigator]);
   const imagesurl = [
    "/rsalted.jpeg",
    "/peri-peri.jpeg",
    "/chocalate.jpeg",
    "/cream.jpeg",
    "/pudina.jpeg"
  ];
  const datadiv = [
  "Roasted Salted",
  "Spicy Peri-Peri",
  "Chocolate Coated",
  "Cream & Onion",
  "Minty Pudina"
];
  const prices=[200,220,300,250,280]
  return (
  <div >
    <Navbar className="mb-96"/>
    <div className=' absolute top-15 flex justify-around gap-8 flex-wrap'>
    {imagesurl.map((item,index)=>{
      return(
      <Items image={item} prices={prices[index]} des={datadiv[index]}/>
  )
    })}</div>
  </div>

  )
}

export default Product
