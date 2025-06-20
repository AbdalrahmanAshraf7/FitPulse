
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from "yup"


export default function Caloriecalc() {
  const [weight, setWeight] = useState(0)
  const [height, setHeight] = useState(0)
  const [age, setAge] = useState(0)
  const [gender, setGender] = useState(null)
  const [activity, setActivity] = useState(0)



  const scrollToTop = () => {
    window.scrollTo({ top: 500, behavior: 'smooth' })
  }


  
 let validationSchema = Yup.object().shape({
    age:Yup.number().required().min(1,"Minimum age is 1").max(100,"Maximum age is 100"),
    height:Yup.number().required().min(100,"Minimum height is 100 cm").max(300,"Maximum height is 300 cm"),
    weight:Yup.number().required().min(10,"Minimum weight is 10 kg").max(300,"Maximum weight is 300 kg"),
  })


  

  let formik = useFormik({


    initialValues:{
      
      age:"",
      height:"",
      weight:"",
      gender:"",
      ActivityLevel:""

    },validationSchema
    ,onSubmit:handlecalc




  })


  function handlecalc (value){
    console.log(value)
    setAge(value.age)
    setHeight(value.height)
    setWeight(value.weight)
    setGender(value.gender)
    setActivity(value.ActivityLevel)
    
  }


     function calc(weight , height , age, gender,activity ){

      if(gender==="male" && activity==="BMR"){
        let x = (10*weight)+(6.25*height)-(5*age)+5
        return x
      }if(gender==="male"&&activity==="noActivity"){
        let x = ((10*weight)+(6.25*height)-(5*age)+5)*1.2
        return x

      }
      if(gender==="male"&&activity==="lightActivity"){
        let x = ((10*weight)+(6.25*height)-(5*age)+5)*1.375
        return x

      }
      if(gender==="male"&&activity==="moderateActivity"){
        let x = ((10*weight)+(6.25*height)-(5*age)+5)*1.55
        return x

      }
      if(gender==="male"&&activity==="highActivity"){
        let x = ((10*weight)+(6.25*height)-(5*age)+5)*1.725
        return x

      }
      if(gender==="female" && activity==="BMR"){
        return (10 * weight) + (6.25 * height) - (5 * age) - 161;
      }
      if(gender==="female" && activity==="noActivity"){
        return ((10 * weight) + (6.25 * height) - (5 * age) - 161) * 1.2;
      }
      if(gender==="female" && activity==="lightActivity"){
        return ((10 * weight) + (6.25 * height) - (5 * age) - 161) * 1.375;
      }
      if(gender==="female" && activity==="moderateActivity"){
        return ((10 * weight) + (6.25 * height) - (5 * age) - 161) * 1.55;
      }
      if(gender==="female" && activity==="highActivity"){
        return ((10 * weight) + (6.25 * height) - (5 * age) - 161) * 1.725;
      }
      return " "
    }


  let xx = calc(weight,height,age,gender,activity,  "xxxxxxxxxxxxxxxxxx")
console.log(Math.floor(xx))









  return <>
  
  <div className='mt-[100px] container lg:gap-16 gap-7 flex flex-col lg:flex-row justify-center font-serif font-bold '>


  <div className='bg-slate-200 py-11 px-4 shadow-lg mb-[35px] lg:mb-[200px] mt-[15px] w-full max-w-[480px] flex flex-col justify-center items-center '>

<form  onSubmit={formik.handleSubmit} className="flex-col justify-center items-center">
  <h1 className='p-5 text-center font-serif '>Calories Calculator</h1>
  <div className="mb-5 flex-col justify-center items-center ">
    <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900 w-[90%] mx-auto ">age</label>
    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.age} type="age" id="age" className="w-[90%] shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 mx-auto" placeholder="" required />
  </div>
  {formik.errors.age&&formik.touched.age &&<div class="p-4 mb-4 text-sm text-red-950 rounded-lg bg-red-300 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span class="font-medium">Danger alert!</span> {formik.errors.age}
</div>}
  <div className="mb-5">
    <label htmlFor="height"  className="block mb-2 text-sm font-medium text-gray-900 w-[90%] mx-auto ">height</label>
    <input placeholder='Height (CM)' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.height} type="height" id="height" className=" w-[90%] mx-auto shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block  p-2.5   " required />
  </div>
  {formik.errors.height&&formik.touched.height &&<div class="p-4 mb-4 text-sm text-red-950 rounded-lg bg-red-300 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span class="font-medium">Danger alert!</span> {formik.errors.height}
</div>}
  <div className="mb-5">
    <label htmlFor="weight" className="block mb-2 text-sm font-medium text-gray-900 w-[90%] mx-auto ">weight</label>
    <input placeholder='Weight (KG)' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.weight} type="weight" id="weight" className=" w-[90%] mx-auto shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block  p-2.5   " required />
  </div>
  {formik.errors.weight&&formik.touched.weight &&<div class="p-4 mb-4 text-sm text-red-950 rounded-lg bg-red-300 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span class="font-medium">Danger alert!</span> {formik.errors.weight}
</div>}
  <div className="mb-5">
  <label htmlFor="gender" className='bg-red-500'></label>
  <select
 
    name="gender" 
    id="gender"
    className="p-2 rounded bg-black text-white hover:text-white ms-3" 
    value={formik.values.gender}  
    onChange={formik.handleChange}  
    onBlur={formik.handleBlur}
  >
    <option value="" className='hover:text-white'> Gender</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
  </select>
  </div>

  <div className="mb-5  ">
  <label htmlFor="ActivityLevel" className=''></label>
  <select
    name="ActivityLevel" 
    id="ActivityLevel"
    className="p-2 rounded bg-black text-white hover:text-white ms-3 w-[90%] "
    value={formik.values.activity}  
    onChange={formik.handleChange}  
    onBlur={formik.handleBlur}
  >
    <option value="">Activity Level</option>
    <option value="BMR">Basal Metabolic Rate ("BMR")</option>
    <option value="noActivity">inactive("no exercise")</option>
    <option value="lightActivity">Light activity ("1-3 sports days per week")</option>
    <option value="moderateActivity">Moderate activity ("3-5 sports days per week")</option>
    <option value="highActivity">High activity ("6-7 sports days per week")</option>
  </select>
  </div>
  
  <button onClick={scrollToTop} type="submit" className=" mx-auto w-[90%] ms-5 mt-3 text-white bg-black hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Calculate</button>
  
</form>
<div className="mx-auto w-full  ">
{
    xx>0&&  <div className=' font-bold text-2xl'>
    <div className=' w-[100%]   p-7 rounded my-3'>
      <div className='p-2 '>
      {
    xx>0&& <h1 className=' text-center flex text-white font-bold font-serif  md:text-wrap'><span className='bg-green-400 p-3 w-1/2'>Maintain Weight:</span><span className='flex justify-center items-center bg-white flex-grow text-yellow-600 font-sans'>{xx == 0? " ":Math.floor(xx)}</span></h1>
  }
      </div>
      <div className='p-2 '>
      {
    xx>0&& <h1 className=' text-center flex text-white font-bold font-serif lg:text-nowrap md:text-wrap'><span className='bg-green-400 p-3 w-1/2'>Loss Weight:</span><span className='flex justify-center items-center bg-white flex-grow text-yellow-600 font-sans'>{xx == 0? " ":Math.floor(xx-500)}</span></h1>
  }
      </div>
 
      <div className='p-2 '>
      {
    xx>0&& <h1 className=' text-center flex text-white font-bold font-serif lg:text-nowrap md:text-wrap'><span className='bg-green-400 p-3 w-1/2'>Gain Weight:</span><span className='flex justify-center items-center bg-white flex-grow text-yellow-600 font-sans'>{xx == 0? " ":Math.floor(xx+500)}</span></h1>
  }
      </div>
  
    </div>
  </div>
  }

</div>

</div>


<div className='flex-col lg:w-[50%] justify-center items-center '>
<div className='w-[100%] flex flex-col lg:flex-row   text-center lg:mx-auto mb-4 lg:pt-7 items-center justify-center  '>
Calories are a measure of energy that our bodies get from food and drinks. We need calories to perform daily activities, from breathing to exercising. Eating more calories than the body needs can lead to weight gain, while consuming fewer calories can lead to weight loss
</div>
<hr class="border-1 border-gray-600 w-full"></hr>
<div className='w-[100%] flex flex-col lg:flex-row   text-center lg:mx-auto mb-4 lg:pt-7 items-center justify-center  '>
Want to know how many calories your body needs daily? Our Calorie Calculator helps you determine the ideal calorie intake based on your age, weight, height, and activity level. Whether you’re looking to lose weight, gain muscle, or maintain a healthy lifestyle, this tool gives you accurate results in seconds
</div>
<div className='w-[100%] flex flex-col lg:flex-row   text-center lg:mx-auto mb-4 lg:pt-7 items-center justify-center  '>
This step will help you achieve your goal quickly. <i class="fa-solid fa-check p-1 text-white bg-green-500 m-3 rounded-sm"></i>
</div>


</div>








  </div >


  

  

 

  </>
  
}
