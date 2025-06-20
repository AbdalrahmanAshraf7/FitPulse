import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function WorkoutList() {
  const [Workout, setWorkout] = useState([])
  const [openWorkoutId, setOpenWorkoutId] = useState(null)
    const [loading, setLoading] = useState(false);
  

  console.log(Workout,"xxxxxxxxxxxxxxxxxxxxxxxxxx")



  async function GetMyWorkout() {
        setLoading(true);
    try {
      let res = await axios.get("https://fit-app-pink-omega.vercel.app/api/v1/workouts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })

      setWorkout(res?.data?.data?.workouts)
    } catch (err) {
      console.log(err)
    }

    finally {
      setLoading(false);
    }
  }


  async function DeleteWorkout(id) {
      setLoading(true);

    try{
      let res= await axios.delete(`https://fit-app-pink-omega.vercel.app/api/v1/workouts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      console.log(res)
       GetMyWorkout()



    }catch(err){
      console.log(err)
    }

    finally {
      setLoading(false);
    }
    
  }

    useEffect(() => {
    GetMyWorkout()
  }, [])







  return (
    <div className="mt-[100px] container mb-[50px] flex-col justify-center items-center justify-content-center  ">


      
     {loading && (
  <div className="fixed inset-0 bg-slate-200 bg-opacity-20 z-50 flex items-center justify-center">
    <div className="loadingHeart"></div>

  </div>
)}
      {Workout.map((W) => (
        <div key={W._id} className='bg-black text-white mb-[50px] rounded-md w-[90%] mx-auto'>
          <div className='p-4 flex justify-between font-bold font-serif'><span>Workout Name: {W.name}</span> <span onClick={()=>{return DeleteWorkout(W._id)}}><i className="fa-solid fa-trash cursor-pointer hover:text-gray-400"></i></span> </div>

          {/* Toggle Details */}
          <div className='flex justify-end p-3 cursor-pointer' onClick={() => setOpenWorkoutId(openWorkoutId === W._id ? null : W._id)}>
            <i className="fa-solid fa-angle-down text-xl text-white"></i>
          </div>

          {/* Conditional rendering for details */}
          {openWorkoutId === W._id && (
            <div className='bg-gray-100 p-4 text-black font-bold font-serif'>
              <div>Category: {W.category}</div>
              <div>Difficulty: {W.difficulty}</div>
              <div>Duration: {W.duration}</div>
              <div className='flex justify-between '>
                <span>Category: {W.category}</span>
                <span>
                  Total Calories Burned from exercises: {
                    W?.exercises?.reduce((sum, item) => sum + (item.exercise?.caloriesBurned || 0), 0)
                  }
                </span>
                <span>
                 Total Calories on meals: {
                          W?.nutritionPlan?.reduce((sum, item) => sum + (item.calories || 0), 0)
                                          }
                </span>
              </div>


              <div className='bg-black p-5 mt-4'>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th className="p-4 text-center"></th>
                        <th className="px-6 py-3 text-center">Reps</th>
                        <th className="px-6 py-3 text-center">Rest time</th>
                        <th className="px-6 py-3 text-center">Sets</th>
                        <th className="px-6 py-3 text-center">Name of exercise</th>
                        <th className="px-6 py-3 text-center">Calories Burned</th>
                        <th className="px-6 py-3 text-center">Primary Muscle Group</th>
                        <th className="px-6 py-3 text-center">Exercise image</th>
                      </tr>
                    </thead>
                    <tbody>
                      {W?.exercises?.map((E, index) => (
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <td className="w-4 p-4">
                            <div className="flex items-center">
                              <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center text-black">{E.reps}</td>
                          <td className="px-6 py-4 text-center text-black">{E.rest}</td>
                          <td className="px-6 py-4 text-center text-black">{E.sets}</td>
                          <td className="px-6 py-4 text-center text-black">{E.exercise?.name}</td>
                          <td className="px-6 py-4 text-center text-black">{E.exercise?.caloriesBurned}</td>
                          <td className="px-6 py-4 text-center text-black">{E.exercise?.primaryMuscleGroup}</td>
                          <td className="px-6 py-4 flex justify-center text-black">
                             <Link to={`/exercisesdetails/${E?.exercise?.name}`} key={E._id}>
                            <img src={E.exercise?.image} alt="exercise" className="w-16 h-16 object-cover rounded" />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>


              <div className='bg-black p-5'>



<div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
               
            </tr>
        </thead>
        <tbody>
          <div className='flex gap-3'>

       
              {
                W?.nutritionPlan?.map((N)=>{return<>
            <tr className="bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 flex rounded-md">
                 <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white rounded-md ">

                

<div className=" max-w-sm bg-gray-100 border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 w-[250px] p-5 m-3 ">
    <a href="#">
        <img  src={N.image} className=" h-[120px] w-full"   alt="product image" />
    </a>
    <div className="px-1 my-3 text-[15px] font-serif font-bold text-red-800 ">
      <p className=''>{N.name}</p>
    </div>
    <div className="px-1 my-3 text-[15px] font-serif font-bold text-red-800 ">
    <span className='flex gap-2'>  <p> Calories: </p><p className=''>{N.calories}</p></span>
    </div>
    <div className="px-1 my-3 text-[15px] font-serif font-bold text-red-800 ">
    <span className='flex gap-2'>  <p> protein:</p><p className=''>{N.macronutrients.protein}</p></span>
    <span className='flex gap-2'>  <p> carbohydrates: </p><p className=''>{N.macronutrients.carbohydrates}</p></span>
    <span className='flex gap-2'>  <p> fats: </p><p className=''>{N.macronutrients.fats}</p></span>
    </div>
  
</div>

                    
                </td>
                
                
                
              </tr>
                </>})
              }
                 </div>
               
               
         
        </tbody>
    </table>
</div>



             </div>

              
            </div>
          )}
             
        </div>

        
      ))}




   
    </div>
  )
}
