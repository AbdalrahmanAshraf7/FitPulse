import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Navigate, useNavigate } from 'react-router-dom'



export default function SeeCoaches() {
  const [Coaches, setCoaches] = useState([])
    const [loading, setLoading] = useState(false);
  

    async function GetCoaches() {
       setLoading(true);
        try{
            let res = await axios.get("https://fit-app-pink-omega.vercel.app/api/v1/coaches/",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

            console.log(res.data.data.coaches,"Get Coaaaaaaaaaaaaaaaach")
            setCoaches(res?.data?.data?.coaches)
    


        }catch(err){
            console.log(err)
        }

        finally {
      setLoading(false);
    }
        
    }


    useEffect(() => {
        GetCoaches()
      
    
      return () => {
        
      }
    }, [])
    


    
  return <>

  <div className=' font-bold font-serif bg-slate-50 flex-col items-center justify-center'>

    {loading && (
  <div className="fixed inset-0 bg-[#1f2937] bg-opacity-20 z-50 flex items-center justify-center">
    <div className="loadingHeart"></div>

  </div>
)}

    <div className='mt-[50px] p-5'>
      {

      Coaches.map((C)=>{return<>
      <div key={C._id} class="w-[80%] mx-auto p-7 my-10 bg-gray-100 border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
    <div class="px-5 pb-5">
      <div>
        <span className='text-red-800'>Coach Name: </span><span>{C.name}</span>
      </div>
      <div className='my-[30px]'>
        <span className='text-red-800'>Bio: </span><span>{C.bio}</span>
      </div>

      <div className='bg-red-900 py-[2px] mb-10'></div>

      <div className='flex gap-3'>

        <div className='text-red-800'>
          Specialties: 

        </div>

        <div>
           {
        C?.specialties?.map((S)=>{return<>

        <div>
          {S}
        </div>
        
        
        </>

          



        })
      }

      </div>

      </div>

      

   
 
   
        <div class="flex items-center justify-between mt-3">
            <span class="text-3xl font-bold text-gray-900 dark:text-white">{C.pricePerMonth}  <span className='text-red-800'>$</span><span className='text-xs'>'(Monthly)'</span></span>
            <Link to={`/substocoach/${C._id}`}>
            <button  class="bg-red-900 hover:bg-red-500 px-3 py-2 rounded-md text-white">Subscribe</button>
            </Link>
        </div>
    </div>
</div> 
      </>})

    }

    </div>

    




  </div>
  
  
  </>
}
