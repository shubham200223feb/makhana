
import { useGSAP } from '@gsap/react'
import axios from 'axios';
import gsap from 'gsap'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Account = () => {
    const navigater=useNavigate()
  const [state, setState] = React.useState("login");
  const[lodeing,setlodeing]= React.useState(false);

    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
if(state==="login"){
    setlodeing(true);
    const responses= await axios.post("/api/user/login", formData);
    setFormData({
        name: '',
        email: '',
        password: ''
    })
    const data= responses.data;
  console.log(responses)

    if(!data.sucess){
        setlodeing(false)
        console.log (data);
        console.log("shubham error aa gya");
         toast.error(data.message);
        return console.log(data.message,data.error);

    }
     toast.success(data.message);
      
        setlodeing(false);
        localStorage.setItem("userlogin",JSON.stringify(data));
    
        navigater("/product")
    
}else{
   setlodeing(true);
    const responses= await axios.post("/api/user/signup", formData);
    setFormData({
        name: '',
        email: '',
        password: ''
    })
    const data= responses.data;
    

    if(!data.sucess){

        console.log("shubham error aa gya");
         toast.error(data.message);
        return console.log(data.message,data.error);

    }
     toast.success(data.message);
      
        setlodeing(false);
        localStorage.setItem("userlogin",JSON.stringify(data));
    
        navigater("/product")

}

    }

  useGSAP(() => {
    gsap.utils.toArray(".falling").forEach((img) => {
      gsap.to(img, {
        y: "120vh",
        x: `${Math.random() * 60}vw`,
        duration: Math.random() * 10 + 2,
        rotate:360,
        repeat: -1,
        yoyo:true,
        ease: "none",
      });
    });
  });

  return (
    <div className=' h-screen w-screen bg-amber-50'>
      <div className="h-full w-full absolute overflow-hidden">

      {/* FALLING MAKHANA IMAGES */}
      <img className="falling h-[6vw] absolute left-[10vw] -top-[2vh]" src="/makhana.png" />
      <img className="falling h-[7vw] absolute left-[30vw] -top-[5vh]" src="/makhana.png" />
      <img className="falling h-[5vw] absolute left-[50vw] -top-[10vh]" src="/makhana.png" />
      <img className="falling h-[6vw] absolute left-[70vw] -top-[1vh]" src="/makhana.png" />
      <img className="falling h-[8vw] absolute left-[85vw] -top-[12vh]" src="/makhana.png" />

    </div>
    <div className=' h-full w-full relative flex items-center justify-center'>
     <form
                onSubmit={handleSubmit}
                className="w-full sm:w-87.5 text-center bg-white/6 border border-white/10 rounded-2xl px-8">
                <h1 className="text-gray-500 text-3xl mt-10 font-medium">
                    {state === "login" ? "Login" : "Sign up"}
                </h1>

                <p className="text-gray-400 text-sm mt-2">Please sign in to continue</p>

                {state !== "login" && (
                    <div className="flex items-center mt-6 w-full bg-gray-700 ring-gray-700 focus-within:ring-indigo-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all ">
                       
                        <input type="text" name="name" placeholder="Name" className="w-full bg-transparent text-white placeholder-white/60 border-none outline-none " value={formData.name} onChange={handleChange} required />
                    </div>
                )}

                <div className="flex items-center w-full mt-4 bg-gray-700 ring-2 ring-gray-700 focus-within:ring-indigo-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all ">
           
                    <input type="email" name="email" placeholder="Email id" className="w-full bg-transparent text-gray-500 placeholder-white/60 border-none outline-none " value={formData.email} onChange={handleChange} required />
                </div>

                <div className=" flex items-center mt-4 w-full bg-gray-700 ring-2 ring-gray-700 focus-within:ring-indigo-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all ">
                    
                    <input type="password" name="password" placeholder="Password" className="w-full bg-transparent text-gray-500 placeholder-white/60 border-none outline-none" value={formData.password} onChange={handleChange} required />
                </div>

                <div className="mt-4 text-left">
                    <button className="text-sm text-indigo-400 hover:underline">
                        Forget password?
                    </button>
                </div>
<button 
  type="submit"
  className="mt-2 w-full h-11 rounded-full  text-white   bg-gradient-to-r from-amber-700 to-yellow-600  hover:from-amber-600 hover:to-yellow-500 transition"> {lodeing ?"plss wait....": (state === "login" ? "Login" : "Sign up")}</button>
               

                <p onClick={() => setState(prev => prev === "login" ? "register" : "login")} className="text-gray-400 text-sm mt-3 mb-11 cursor-pointer" >
                    {(state === "login" ? "Don't have an account?" : "Already have an account?")}
                    <span className="text-indigo-400 hover:underline ml-1">click here</span>
                </p>
            </form>
    </div>
    </div>
    
  );
  
}

export default Account
