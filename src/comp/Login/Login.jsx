import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useNavigate,Link } from 'react-router-dom'
import {UserContext} from "../../Context/Usercontext.jsx"
import * as Yup from "yup"
import { useCart } from "../../Context/CartContext";
import { useNotifications } from "../../Context/NotificationsContext.jsx";





export default function Signup() {
    const [sucess, setsucess] = useState(null)
      const [loading, setloading] = useState(false)
    const [faild, setfail] = useState(null)
    const [token, setToken] = useState(null)
      const { ResultsN,setResultsN,getNotifications} = useNotifications();
    const [toggle, setToggle] = useState(false)
    const [toggle2, setToggle2] = useState(false)
const { setGetToken } = useContext(UserContext);
    let nav = useNavigate()
        const { cart, deleteFromCart,getCart,Results,setResults } = useCart();



    

    

    async function handleLogin(values) {
        setloading(true);
        try {
            let res = await axios.post("https://fit-app-pink-omega.vercel.app/api/v1/auth/login", values)
            console.log(res.data.token)
            setsucess(res?.data?.message)
            setToken(res?.data?.token)
            localStorage.setItem("token", res?.data?.token)
            setGetToken(res?.data?.token)
             setloading(false)
            setfail(" ")
         setTimeout(() => {
        nav("/userprofile");
      }, 1000);
      setResults(null)
      getCart()
      getNotifications()
      setResultsN("!")
      



      console.log(Results,"reeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")

        } catch (err) {
            console.log(err)
            setfail(err.response.data.message)
            setloading(false)
            setsucess(" ")
        }
    }




 let validationSchema = Yup.object().shape({
    email:Yup.string().required().min(3,"enter more than 3 letters").email("email isnot vaild"),
    password:Yup.string().required().min(3,"enter more than 3 letters").max(10,"no more than 10 letters").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,"Password must be at least 8 characters long, Password must contain at least one uppercase letter, one lowercase letter, and one number"),
  })






    let formik = useFormik({
        initialValues: {
  
  "email": "",
  "password": ""

},validationSchema
,onSubmit: handleLogin
    })

    return <>
    <div className='h-lvh flex justify-center items-center Login-background mt-11 relative w-full'>

        <div className='absolute bg-gray-950 bg-opacity-55 top-0 bottom-0 left-0 right-0 flex flex-col justify-center items-center w-full'>
            
         <form className="lg:w-[40%] ms-auto  mb-10 container  bg-gray-100 p-5  shadow-md py-10 px-10 rounded-md z-50" onSubmit={formik.handleSubmit}>
             <h2 className='py-3 mb-4 text-center  font-bold font-serif text-2xl'>Log In</h2>
            <div className=''>
                
                

                <div className="mb-5 ">
                    <label htmlFor="email" className="block mb-2 text-sm  text-gray-900 font-bold font-serif">Your email</label>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
                </div>
            </div>

             {formik.errors.email&&formik.touched.email &&<div class="p-4 mb-4 text-sm text-red-950 rounded-lg bg-red-300 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span class="font-medium">Danger alert!</span> {formik.errors.email}
</div>}

            <div className="mb-5 relative">
                <label htmlFor="password" className="block mb-2 text-sm  text-gray-900 font-bold font-serif">
                    Your password
                </label>
                <input
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    type={toggle ? "text" : "password"}
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 font-bold font-serif"
                    placeholder=""
                    required
                />
                <i
                    onClick={() => setToggle(!toggle)}
                    className={`absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer mt-3 ${toggle ? "text-yellow-600 fa-solid fa-eye" : "fa-solid fa-eye-slash"}`}
                ></i>
            </div>

             {formik.errors.password&&formik.touched.password &&<div class="p-4 mb-4 text-sm text-red-950 rounded-lg bg-red-300 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span class="font-medium">Danger alert!</span> {formik.errors.password}
</div>}

<Link to={`/signup`}>
<div className='my-5 hover:text-blue-700 cursor-pointer'>
    <span className=' hover:text-blue-700 cursor-pointer font-bold font-serif' >Don't Have An Account Yet ?</span>
</div>
</Link>


           

            

           {loading? <button type="submit" className="font-bold font-serif text-white bg-black hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Loading...</button>:
   <button type="submit" className="text-white bg-black hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold font-serif rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
  }

            <h1 className='mt-5'>{sucess}</h1>
            <h1 className='mt-5'>{faild}</h1>
        </form>

        </div>

    </div>
       
    </>
}
