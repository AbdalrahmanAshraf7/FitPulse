import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";


export default function Notification() {
  const [Noti, setNoti] = useState(null)
  const [loading, setLoading] = useState(false);

  async function getNotifications() {
    setLoading(true);

    try {
      let res = await axios.get("https://fit-app-pink-omega.vercel.app/api/v1/notifications", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })

      console.log(res)
      setNoti(res.data.data.notifications)
      toast.success(res.data.data.notifications[Noti.length+0].text);


    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getNotifications()
  }, [])

  return (
    <>
    {
      Noti===null ? <div className='mt-[100px] flex justify-center items-center'>
           {loading && (
          <div className="fixed inset-0 bg-[#1f2937] bg-opacity-20 z-50 flex items-center justify-center">
            <div className="loadingHeart"></div>
          </div>
        )}<span className='bg-gray-300 w-[70%] text-center h-lvh m-7 flex items-center justify-center'> <span className='mt-[50px] font-serif font-bold text-8xl'>No Thing Yet <br></br> <span className=' text-xl'>
          Please log in or subscribe to coach
          </span></span> </span> </div>: 
      <div className='font-bold font-serif bg-slate-50 flex-col items-center justify-center'>

        {loading && (
          <div className="fixed inset-0 bg-[#1f2937] bg-opacity-20 z-50 flex items-center justify-center">
            <div className="loadingHeart"></div>
          </div>
        )}

        <div className='mt-[50px] p-5'>
          {
            Noti?.map((N) => {
              const formattedDate = new Date(N.createdAt).toLocaleString("en-US", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
              });

              return (
                <div key={N._id} className="w-[80%] mx-auto p-7 my-10 bg-gray-100 border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                  <div className="px-5 pb-5">
                    <div>
                      <span className='text-red-800'>Coach Name: </span><span>{N.from.username}</span>
                    </div>
                    <div className='my-[30px]'>
                      <span className='text-red-800'>Created At: </span><span  className='font-sans'>{formattedDate}</span>
                    </div>
                    <div className='my-[30px]'>
                      <span className='text-red-800'>Type: </span><span>{N.type}</span>
                    </div>
                    <div className='my-[30px]'>
                      <span className='text-red-800'>Workout Name: </span><span>{N.text}</span>
                    </div>

                    <div className='bg-red-900 py-[2px] mb-10'></div>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>


    }



   
    </>
  )
}
