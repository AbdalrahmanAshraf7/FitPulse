import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import * as Yup from "yup"
import { useFormik } from 'formik'
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom'
import Goku from "../../assets/images/Goku.mp4"



export default function SubsToCoach() {
 const [loading, setloading] = useState(false)
 let nav = useNavigate()
 const [showVideo, setShowVideo] = useState(false);
 const [SubsToCoache, setSubsToCoach] = useState(null)
 const [AlreadySubs, setAlreadySubs] = useState(null)

 console.log(AlreadySubs,"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

 
let {id} = useParams()


async function SubsToCoach(values) {
          setloading(true);

    try{
        let res = await axios.post("https://fit-app-pink-omega.vercel.app/api/v1/subscribtions",values,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

        console.log(res)
          

                    setTimeout(() => {
        nav("/mysubs");
      }, 2000);

      setSubsToCoach(res?.data?.status)



    }catch(err){

        console.log(err)

        if(err.response.status===400){
          setAlreadySubs("You already have an active or pending subscription with this coach")



        }



    }

    
        finally {
      setloading(false);
    }


    
}












let validationSchema = Yup.object().shape({
    cardNumber:Yup.string().required().matches(/^\d{4}( \d{4}){3}$/,"Please enter a 16-digit number grouped in sets of 4 separated by spaces, like: 1234 5678 9012 3456."),
  })



    let formik = useFormik({
        initialValues: {
  
 "coachId":id,
    "cardNumber":"",
    "duration":""

},validationSchema
,onSubmit:SubsToCoach
    })
    




  return<>
      <div className='mt-[100px] '>

        {showVideo && (
  <div style={{
    position: 'fixed',
    top: 0, left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.5)', // أو اجعلها شفافة تمامًا
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999
  }}>
    <video autoPlay muted>
      <source src={Goku} type="video/mp4" />
      متصفحك لا يدعم تشغيل الفيديو
    </video>
  </div>
)}

        <form className="lg:w-[40%] ms-auto  mb-10 container  bg-gray-100 p-5  shadow-md py-10 px-10 rounded-md z-50" onSubmit={formik.handleSubmit}>
             <h2 className='py-3 mb-4 text-center  font-bold font-serif text-2xl text-red-700'>Subscribe To Coach</h2>
            <div className=''>
                
                

                <div className="mb-5 ">
                    <label htmlFor="cardNumber" className="block mb-2 text-sm  font-bold font-serif text-red-600">Enter Your Card Number</label>
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.cardNumber} type="tel" id="cardNumber" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required />
                </div>
            </div>

    

            <div className="mb-5 relative">
                <label htmlFor="duration" className="block mb-2 text-sm   font-bold font-serif text-red-600">
                    Enter The Duration
                </label>
            <select
      id="duration"
      name="duration"
      value={formik.values.duration}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3"
      required
    >
      <option value="" disabled>Duration</option>
      <option value="monthly">Free For 7 days</option>
      <option value="monthly">Monthly</option>
      <option value="quarterly">Quarterly</option>
      <option value="yearly">Yearly</option>
    </select>

    {formik.errors.cardNumber&&formik.touched.cardNumber &&<div className="p-4 mb-4 text-sm text-red-950 rounded-lg bg-red-300 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium ">Danger alert!</span> {formik.errors.cardNumber}
</div>}
              
            </div>



           

            

           
{loading? <button type="submit" className="font-bold font-serif text-white bg-black hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Loading...</button>:
   <button type="submit" className="text-white bg-black hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold font-serif rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Subscribe </button>
  }  

        <div className='mt-3 text-green-600 font-bold font-serif'>{SubsToCoache}</div>
        <div className='mt-3 text-red-800 font-bold font-serif'>{AlreadySubs}</div>
        </form>
      </div>
  </>
}
