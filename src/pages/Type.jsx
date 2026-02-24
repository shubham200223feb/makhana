
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
  const imagedivref = useRef(null);

  useGSAP(() => {
    // EK HI TRIGGER DONO KE LIYE
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=400%", // Scroll ki length (jitna lamba scroll chahiye)
      pin: true,     // Poore section ko pin kar diya
      scrub: 1,
      onUpdate: (self) => {
        // Progress ke basis par index nikalna (0 to 1)
        let index = Math.floor(self.progress * imagesurl.length);
        
        // Index out of bounds na ho jaye
        if (index >= imagesurl.length) index = imagesurl.length - 1;

        // Image Change
        if (imgref.current) {
          imgref.current.src = imagesurl[index];
        }

        // Text Change (Check taaki baar-baar DOM update na ho)
        if (descriptionRef.current && descriptionRef.current.innerText !== datadiv[index]) {
          descriptionRef.current.innerText = datadiv[index];
        }
      }
    });
  }, { scope: containerRef });

  return (
    // Main Container jo Pin hoga
    <div ref={containerRef} className='w-full h-screen overflow-hidden bg-white flex items-center justify-center relative'>
      
      {/* IMAGE DIV - Left side set kar diya */}
      <div ref={imagedivref} className='h-[30vw] w-[22vw] rounded-3xl overflow-hidden absolute left-[10vw] shadow-2xl'>
        <img ref={imgref} className='object-cover w-full h-full' src={imagesurl[0]} alt="Makhana" />
      </div>

      {/* TEXT CONTENT - Right side set kar diya */}
      <div className='absolute right-[10vw] w-[45vw]'>
          <h1 className='text-[8vw] font-bold leading-none uppercase mb-8'>
            Type Of <br /> Makhana
          </h1>
          <p ref={descriptionRef} className='text-3xl font-medium text-gray-700 min-h-[150px] italic'>
            {datadiv[0]}
          </p>
      </div>

    </div>
  );
}

export default Type;