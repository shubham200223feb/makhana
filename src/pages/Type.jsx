import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from "../components/Navbar.jsx"

const Type = () => {
  gsap.registerPlugin(ScrollTrigger);

  const imagesurl = [
    "/all.jpeg",
    "/rsalted.jpeg",
    "/peri-peri.jpeg",
    "/chocalate.jpeg",
    "/cream.jpeg",
    "/pudina.jpeg"
  ];

  const datadiv = [
    "Discover our exclusive range of fresh and crunchy Makhanas...",
    "Roasted Salted Makhana is a light and healthy snack prepared with gentle roasting...",
    "Peri-Peri Makhana delivers a bold and spicy flavour...",
    "Chocolate Makhana combines crunch with smooth chocolate coating...",
    "Cream & Onion Makhana offers a rich, savoury flavour...",
    "Pudina Mint Makhana provides a refreshing and mildly spiced flavour..."
  ];

  const containerRef = useRef(null);
  const imgref = useRef(null);
  const descriptionRef = useRef(null);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=500%",
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        let index = Math.floor(self.progress * imagesurl.length);
        if (index >= imagesurl.length) index = imagesurl.length - 1;

        if (imgref.current) {
          imgref.current.src = imagesurl[index];
        }

        if (descriptionRef.current && descriptionRef.current.innerText !== datadiv[index]) {
          descriptionRef.current.innerText = datadiv[index];
        }
      }
    });
  }, { scope: containerRef });

  return (
    <div>
     
      <Navbar  />

     
      <div
        ref={containerRef}
        className="w-full h-[90vh] pt-[10vh] overflow-hidden bg-white flex items-center justify-center relative"
      >

        
        <div className="h-[30vw] w-[22vw] rounded-3xl overflow-hidden absolute left-[10vw] shadow-2xl">
          <img ref={imgref} className="object-cover w-full h-full" src={imagesurl[0]} alt="Makhana" />
        </div>

       
        <div className="absolute right-[10vw] w-[45vw]">
          <h1 className="text-[8vw] font-bold leading-none uppercase mb-8">
            Type Of <br /> Makhana
          </h1>

          <p
            ref={descriptionRef}
            className="text-3xl font-medium text-gray-700 min-h-[150px] italic"
          >
            {datadiv[0]}
          </p>
        </div>

      </div>
    </div>
  );
}

export default Type;