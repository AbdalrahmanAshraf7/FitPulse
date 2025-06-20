import axios from 'axios'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from "yup"
import Dumble from "../../assets/images/Dmble.jpg"
import { Link, useParams } from 'react-router-dom'
import { Navigate, useNavigate } from 'react-router-dom'



export default function CreatWorkout() {
  const [Exercises, setExercises] = useState([]);
  const [Page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [level, setLevel] = useState("All");
  const [muscleGroup, setMuscleGroup] = useState("All");
  const [disabledByTimeout, setDisabledByTimeout] = useState(false);
   const [Products, setProducts] = useState([])
   const productsList = [];
   const [Extoggle, setExtoggle] = useState(false)
   const [arrowToggle, setarrowToggle] = useState(false)
   const [Extoggle2, setExtoggle2] = useState(false)
   const [arrowToggle2, setarrowToggle2] = useState(false)
   const nav = useNavigate();
   const [Sucess, setSucess] = useState(null)
   const [Duplicate, setDuplicate] = useState(null)
       



     const scrollToTop = () => {

        if (Extoggle==false){
            
            window.scrollTo({ top: 2000, behavior: 'smooth' })
        }else{

            window.scrollTo({ bottom: 1000, behavior: 'smooth' })
        }


    }

     const scrollToTop2 = () => {

        if (Extoggle2==false){
            
            window.scrollTo({ top: 20000, behavior: 'smooth' })
        }else{

            window.scrollTo({ bottom: 0, behavior: 'smooth' })
        }

    }





async function CreatWorkout(values) {
   setLoading(true);
  try {
    // تحويل النصوص إلى أرقام داخل المصفوفة exercises
    const exercisesWithNumbers = values.exercises.map(ex => ({
      ...ex,
      sets: Number(ex.sets),
      reps: Number(ex.reps),
      rest: Number(ex.rest),
    }));

    const payload = {
      ...values,
      exercises: exercisesWithNumbers,
    };

    let res = await axios.post("https://fit-app-pink-omega.vercel.app/api/v1/workouts", payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    setSucess(res.data.status)
    setDuplicate(" ")

    console.log(res,"FORMMMMMMMMMMMMMMMMMMMMMMMMMM")


     setTimeout(() => {
        nav("/workoutlist");
      }, 1000);

    console.log(res);
  } catch (err) {
    console.log(err);
    setDuplicate(err.response.data.message)
  }


   finally {
      setLoading(false);
}
}













    

 async function getExercises(currentPage, currentLevel) {
    setLoading(true);
    try {
      let url = `https://fit-app-pink-omega.vercel.app/api/v1/exercises?limit=8&page=${currentPage}`;
      if (currentLevel !== "All") {
        url += `&level=${currentLevel}`;
      }
      if (muscleGroup !== "All") {
        url += `&keyword=${muscleGroup}`;
      }

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      console.log(url);
      console.log(res,"xxxxxxxxxxxxxxxx");

      setExercises(res.data.data.exercises);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

useEffect(() => {
  const timer = setTimeout(() => {
    if (!loading) {
      getExercises(Page, level);
    }
  }, 1000);

  return () => clearTimeout(timer);
}, [Page, level, muscleGroup]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setDisabledByTimeout(true);
    setTimeout(() => {
      setDisabledByTimeout(false);
    }, 10000);
  };


  async function GetProducts() {

    try{
        let res = await axios.get("https://fit-app-pink-omega.vercel.app/api/v1/products?limit=20", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })

      console.log(res,"Products")
          setProducts(res.data.data.products)




    }catch(err){

        console.log(err)
    }
    
  }

  useEffect(() => {
    GetProducts()
    
  
    return () => {
      
    }
  }, [])
  















    // let validationSchema = Yup.object().shape({
    //     name:Yup.string().required().min(3,"enter 3 letters or more ").max(30,"You can't enter more then 30 letters "),
    //     duration:Yup.string().required().min(3,"enter more than 3 letters").email("duration isnot vaild"),
    //     password:Yup.string().required().min(3,"enter more than 3 letters").max(10,"no more than 10 letters").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,"Password must be at least 8 characters long, Password must contain at least one uppercase letter, one lowercase letter, and one number"),
    //   })
    
    
    
    
    
        let formik = useFormik({
            initialValues: {
    
  "name": "",
  "duration": "", 
  "exercises": [],
  "category": "",
  "difficulty": "",
  "nutritionPlan": []

    }
    ,onSubmit: CreatWorkout
        })







const addExerciseToFormik = (exerciseId) => {
  const currentExercises = formik.values.exercises;

  const existsIndex = currentExercises.findIndex(e => e.exercise === exerciseId);

  if (existsIndex === -1) {
    formik.setFieldValue('exercises', [
      ...currentExercises,
      { exercise: exerciseId, sets: '', reps: '', rest: '' }
    ]);
  } else {
    const newExercises = [...currentExercises];
    newExercises.splice(existsIndex, 1);
    formik.setFieldValue('exercises', newExercises);
  }
};


const getExerciseNameById = (id) => {
  const exercise = Exercises.find(e => e._id === id);
  return exercise ? exercise.name : "";
};











const addProductToFormik = (productId) => {
  const currentProducts = formik.values.nutritionPlan;
  const index = currentProducts.indexOf(productId);

  if (index === -1) {
    formik.setFieldValue('nutritionPlan', [...currentProducts, productId]);
  } else {
    const newProducts = [...currentProducts];
    newProducts.splice(index, 1);
    formik.setFieldValue('nutritionPlan', newProducts);
  }
};


const getProductNameById = (id) => {
  const product = Products.find(p => p.id === id);
  return product ? product.name : "Unknown Product";
};











  return <>

 <form className="max-w-4xl mx-auto mt-36 mb-16 bg-gray-100 shadow-xl rounded-2xl p-10 font-serif" onSubmit={formik.handleSubmit}>
  <h2 className='text-3xl font-bold text-center mb-10 underline underline-offset-4'>Create Workout</h2>

  {/* Workout Name */}
  <div className="mb-6">
    <label htmlFor="name" className="block text-gray-700 font-semibold mb-2 underline">Workout Name</label>
    <input
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.name}
      type="text"
      id="name"
      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-red-700 placeholder-opacity-50"
      required
      placeholder='Enter Workout Plan Name'
    />
    {formik.errors.name && formik.touched.name && (
      <div className="mt-2 text-sm text-red-700 bg-red-100 px-4 py-2 rounded-md">
        <strong>Error:</strong> {formik.errors.name}
      </div>
    )}
  </div>

    <div className=' container flex justify-center items-center py-5'>
    <div className='py-[2px] bg-red-800 w-[100%]'>

    </div>
  </div>

  {/* Select Exercises */}
  <div className="mb-8">
    <div className='flex items-center gap-1 cursor-pointer text-blue-700'>
      <p onClick={() => { scrollToTop(); setExtoggle(!Extoggle); setarrowToggle(!arrowToggle); }} className="font-bold hover:underline">
        Click Here To Select Exercises
      </p>
      <i className={`text-2xl ${arrowToggle ? "fa-solid fa-angle-down" : "fa-solid fa-angle-right"}`} />
    </div>

    <h3 className='mt-4 mb-2 text-lg font-semibold underline'>Selected Exercises</h3>
    {formik.values.exercises.map((ex, i,index) => (
      <div key={ex._id} className="border rounded-md p-4 mb-4 bg-gray-50">
        <p className="mb-2">Exercise Name: <span className='text-blue-800 font-medium'>{getExerciseNameById(ex.exercise)}</span></p>
        <div className='flex flex-wrap gap-4'>
          <input
            type="number"
            placeholder="Sets"
            name={`exercises[${i}].sets`}
            value={ex.sets}
            onChange={formik.handleChange}
            className="flex-1 border rounded px-3 py-2"
          />
          <input
            type="number"
            placeholder="Reps"
            name={`exercises[${i}].reps`}
            value={ex.reps}
            onChange={formik.handleChange}
            className="flex-1 border rounded px-3 py-2"
          />
          <input
            type="number"
            placeholder="Rest"
            name={`exercises[${i}].rest`}
            value={ex.rest}
            onChange={formik.handleChange}
            className="flex-1 border rounded px-3 py-2"
          />
        </div>
      </div>
    ))}
  </div>

    <div className=' container flex justify-center items-center py-5'>
    <div className='py-[2px] bg-red-800 w-[100%]'>

    </div>
  </div>

  {/* Duration */}
  <div className="mb-6">
    <label htmlFor="duration" className="block font-semibold mb-2 underline">Workout Duration (minutes)</label>
    <input
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.duration}
      type="number"
      id="duration"
      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-red-600 placeholder-opacity-50"
      required
      placeholder='Enter The Duration of the Workout'
    />
    {formik.errors.duration && formik.touched.duration && (
      <div className="mt-2 text-sm text-red-700 bg-red-100 px-4 py-2 rounded-md">
        <strong>Error:</strong> {formik.errors.duration}
      </div>
    )}
  </div>

   <div className=' container flex justify-center items-center py-5'>
    <div className='py-[2px] bg-red-800 w-[100%]'>

    </div>
  </div>

  {/* Category */}
  <div className="mb-6">
    <label htmlFor="category" className="block font-semibold mb-2 underline" >Workout Category</label>
    <select
      id="category"
      name="category"
      value={formik.values.category}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      className="w-full border border-gray-300 rounded-lg px-4 py-2"
      required
    >
      <option value="" disabled>Select a category</option>
      <option value="strength">Strength</option>
      <option value="cardio">Cardio</option>
      <option value="flexibility">Flexibility</option>
      <option value="hiit">HIIT</option>
      <option value="yoga">Yoga</option>
      <option value="pilates">Pilates</option>
      <option value="crossfit">Crossfit</option>
    </select>
  </div>

  <div className=' container flex justify-center items-center py-5'>
    <div className='py-[2px] bg-red-800 w-[100%]'>

    </div>
  </div>

  {/* Difficulty */}
  <div className="mb-6">
    <label htmlFor="difficulty" className="block font-semibold mb-2 underline">Difficulty</label>
    <select
      id="difficulty"
      name="difficulty"
      value={formik.values.difficulty}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      className="w-full border border-gray-300 rounded-lg px-4 py-2"
      required
    >
      <option value="" disabled>Select difficulty</option>
      <option value="beginner">Beginner</option>
      <option value="intermediate">Intermediate</option>
      <option value="advanced">Advanced</option>
    </select>
  </div>
   <div className=' container flex justify-center items-center py-5'>
    <div className='py-[2px] bg-red-800 w-[100%]'>

    </div>
  </div>

  {/* Select Products */}
  <div className="mb-10 hidden">
    <div className='flex items-center gap-1 cursor-pointer text-green-900'>
      <p onClick={() => { scrollToTop2(); setExtoggle2(!Extoggle2); setarrowToggle2(!arrowToggle2); }} className="font-bold hover:underline">
        Click Here To Select Product
      </p>
      <i className={`text-2xl ${arrowToggle2 ? "fa-solid fa-angle-down" : "fa-solid fa-angle-right"}`} />
    </div>

    <h3 className='mt-4 mb-2 text-lg font-semibold'>Selected Products</h3>
    {formik.values.nutritionPlan.length === 0 ? (
      <p className='text-gray-500'>No products selected</p>
    ) : (
      formik.values.nutritionPlan.map((prodId, i) => (
        <div key={i} className='mb-2'>
          <span className='text-green-800 font-medium'>• {getProductNameById(prodId)}</span>
        </div>
      ))
    )}
  </div>

  {/* Submit Button */}
  <div className="text-center">
    <button
      type="submit"
      className="bg-black text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors duration-300"
    >
      {loading ? "Loading..." : "Submit"}
    </button>
    {Sucess && <p className='text-green-700 mt-4'>{Sucess}</p>}
    {Duplicate && <p className='text-red-600 mt-4'>{Duplicate}</p>}
  </div>
</form>








<div className={`${Extoggle==false ? "hidden" : " "}`}>
    



<div className={`flex justify-end mt-28 container w-[77%]  `}>
        {/* فلتر المستوى */}
        <select
          className="mb-8 p-2 rounded bg-black text-white self-end ms-[70px] text-center"
          value={level}
          onChange={(e) => {
            if (disabledByTimeout) return;
            setPage(1);
            setLevel(e.target.value);
            setDisabledByTimeout(true);
            setTimeout(() => {
              setDisabledByTimeout(false);
            }, 10000);
          }}
          disabled={disabledByTimeout}
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        {/* فلتر مجموعة العضلات */}
        <select
          className="mb-8 p-2 rounded bg-black text-white self-end ms-4 text-center"
          value={muscleGroup}
          onChange={(e) => {
            if (disabledByTimeout) return;
            setPage(1);
            setMuscleGroup(e.target.value);
            setDisabledByTimeout(true);
            setTimeout(() => {
              setDisabledByTimeout(false);
            }, 10000);
          }}
          disabled={disabledByTimeout}
        >
          <option value="All">All Muscles</option>
          <option value="Shoulder">Shoulder</option>
          <option value="Chest">Chest</option>
          <option value="Lower Back">Lower Back</option>
          <option value="Abdominals">Abdominals</option>
          <option value="Glutes">Glutes</option>
          <option value="Biceps">Biceps</option>
          <option value="Upper Back">Upper Back</option>
          <option value="Cardio">Cardio</option>
          <option value="Triceps">Triceps</option>
          <option value="Quadriceps">Quadriceps</option>
          <option value="Traps">Traps</option>
        </select>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 px-4 container">
        {loading ? (
          <p className="text-white text-xl">Loading...</p>
        ) : Exercises.length > 0 ? (
          Exercises.map((E,index) => (
              <div
              className={`bg-gray-100 border rounded-lg shadow-sm dark:bg-gray-800 h-[270px] 
                ${formik.values.exercises.some(ex => ex.exercise === E._id) 
                    ? 'border-4 border-green-500'  // إطار أخضر لما التمرين محدد
                    : 'border-gray-200 dark:border-gray-700' // الإطار الإفتراضي
                }`}
                key={index}
                onClick={() => addExerciseToFormik(E._id)}
>       
                <div className='flex justify-center' key={E._id}> 
                  <img className="p-8 rounded-t-lg w-[200px] h-[150px]" src={E.image} alt="exercise" onError={(e) => { e.target.onerror = null; e.target.src = Dumble; }} />
                </div>
                <div className='w-full pb-1 mb-3 bg-red-600'></div>
                <div className="px-5 ">
                  <h1 className='h4 font-serif font-medium  text-red-700'>{E.name}</h1>
              
                </div>

            <Link to={`/exercisesdetails/${E.name}`} key={E._id}>
                <button className=' bg-red-900 text-white m-1 ms-2 p-1 rounded-sm'>See Details</button>
            </Link>
              </div>
          ))
        ) : (
          <p className="text-white text-xl">No exercises found.</p>
        )}
      </div>

      <div className="flex flex-col items-center my-5">
        <div className="inline-flex mt-2 xs:mt-0">
          <button
            onClick={() => handlePageChange(Math.max(Page - 1, 1))}
            disabled={Page === 1 || loading || disabledByTimeout}
            className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Prev
          </button>
          <button
            onClick={() => handlePageChange(Page + 1)}
            disabled={loading || disabledByTimeout}
            className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
        <p className="text-white mt-2">Page: {Page}</p>
      </div>




      </div>














<div className={`${Extoggle2==false ? "hidden" : " "}`}>










        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 px-4 container mt-[120px] mb-[50px]">
    {
      Products?.map((P)=>{return<>

                    
  <div
  key={P.id}
  className={`bg-gray-100 border rounded-lg shadow-sm dark:bg-gray-800 h-[425px]
    ${formik.values.nutritionPlan.includes(P.id) 
      ? 'border-4 border-green-500'  // إطار أخضر لو المنتج محدد
      : 'border-gray-200 dark:border-gray-700' // الإطار الافتراضي
    }`}
  onClick={() => addProductToFormik(P.id)}
>
  {/* باقي محتويات المنتج */}

       
               <div className=' flex justify-center '> 
                {/* border-[8px] border-red-600  */}
                <img className="p-8 rounded-t-lg w-[250px] h-[200px] " src={P.image} alt="product" onError={(e) => { e.target.onerror = null; e.target.src = Dumble; }} />
              </div>
              <div className='w-full pb-1 mb-3 bg-red-600'></div>
              <div className="px-5 ">
                <h1 className=' h4 font-serif font-medium my-3 text-red-700'>Name: {P?.name}</h1>
                <h5 className="text font-semibold tracking-tight text-gray-900 dark:text-white h-[90px]">
                  {P.description}
                </h5>
                <p className='text-red-700 mt-2'>Calories: {P?.calories}</p>
                <div className="flex justify-between mt-1">

  
                 
                  
                </div>
              </div>
            </div>
      
      
      
      </>
        
      })






    }
    </div>
    </div>



  
  
  
  
  
  
  
  
  </>
}
