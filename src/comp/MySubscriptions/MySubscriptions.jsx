import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function MySubscriptions() {
  const [MySubs, setMySubs] = useState([])
      const [loading, setLoading] = useState(false);
  

  console.log(MySubs, "MYYYYYYYYYYYYYYYYYYY SUBS")

  async function Mysubs() {
     setLoading(true);

    try {
      let res = await axios.get("https://fit-app-pink-omega.vercel.app/api/v1/subscribtions", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      setMySubs(res?.data?.data?.subscriptions)
    } catch (err) {
      console.log(err)
    }

    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    Mysubs()
  }, [])

  // ✅ دالة لتنسيق التاريخ
  function formatDate(dateString) {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }

  return (
    <>
      <div className='mt-[100px] font-bold font-serif'>

         {loading && (
  <div className="fixed inset-0 bg-[#1f2937] bg-opacity-20 z-50 flex items-center justify-center">
    <div className="loadingHeart"></div>

  </div>
)}
        <div className='mt-[50px] p-5'>
          {MySubs.map((M) => {
            return (
              <div key={M._id} className="w-[80%] mx-auto p-7 my-10 bg-gray-100 border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <div className="px-5 pb-5">
                  <div>
                    <span className='text-red-800'>Coach Name: </span><span>{M.coachId.name}</span>
                  </div>
                  <div className='my-[10px]'>
                    <span className='text-red-800'>Payment Status: </span><span>{M.paymentStatus}</span>
                  </div>
                  <div className='my-[10px]'>
                    <span className='text-red-800'>Duration: </span><span>{M.duration}</span>
                  </div>
                  <div className='my-[10px]'>
                    <span className='text-red-800'>Start Date: </span><span>{formatDate(M.startDate)}</span>
                  </div>
                  <div className='my-[10px]'>
                    <span className='text-red-800'>End Date: </span><span>{formatDate(M.endDate)}</span>
                  </div>

                  <div className='bg-red-900 py-[2px] my-3'></div>

                  <div className='flex gap-3'>
                    <div className='text-red-800'>Specialties:</div>
                    <div>
                      {M?.coachId?.specialties?.map((S, index) => (
                        <div key={index}>{S}</div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      {M.price} <span className='text-red-800'>$</span>
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
