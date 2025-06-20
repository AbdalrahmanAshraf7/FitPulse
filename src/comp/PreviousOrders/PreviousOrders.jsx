import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function PreviousOrders() {
  const [MyBookings, setMyBookings] = useState(null)
  const [openDetails, setOpenDetails] = useState({}) // track open/close state per booking
      const [loading, setLoading] = useState(false);
  

  async function GetMyBookings() {
            setLoading(true);

    try {
      let res = await axios.get("https://fit-app-pink-omega.vercel.app/api/v1/bookings", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      setMyBookings(res?.data?.data?.myBookings)
    } catch (err) {
      console.log(err)
    }

      finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    GetMyBookings()
  }, [])

  const toggleDetails = (bookingId) => {
    setOpenDetails(prev => ({
      ...prev,
      [bookingId]: !prev[bookingId]
    }))
  }

  return (
    <div className='mt-[100px]'>
             {loading && (
  <div className="fixed inset-0 bg-slate-200 bg-opacity-20 z-50 flex items-center justify-center">
    <div className="loadingHeart"></div>

  </div>
)}
      {MyBookings?.map((M) => (
        <div key={M._id} className='bg-black p-5 m-5 rounded-md font-bold font-serif '>
          <div className='flex gap-3 text-white'>
            <span>Total Price :</span> <span>{M.totalPrice}$</span>
          </div>
          <div className='flex gap-3 text-white'>
            <span>Payment Status :</span> <span>{M.paymentStatus}</span>
          </div>
          <div className='flex justify-between'>
            <div className='flex gap-3 text-white'>
              <span>It was purchased at :</span> <span>{new Date(M.createdAt).toLocaleString()}</span>
            </div>
            <i
              className={`fa-solid fa-angle-${openDetails[M._id] ? 'up' : 'down'} text-white text-xl font-bold cursor-pointer`}
              onClick={() => toggleDetails(M._id)}
            ></i>
          </div>

          {openDetails[M._id] && (
            <div className='bg-gray-600 mt-7'>
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-red-900">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3"></th>
                      <th scope="col" className="px-6 py-3"></th>
                      <th scope="col" className="px-6 py-3"></th>
                      <th scope="col" className="px-6 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b dark:bg-gray-800 dark:border-gray-700 border-gray-20">
                      <td colSpan={4}>
                        <div className='flex gap-3 p-5 flex-wrap'>
                          {M?.items?.map((I, idx) => (
                            <div key={idx} className="bg-gray-100 border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 h-[350px] w-[250px]">
                              <div className='flex justify-center'>
                                <img
                                  className="p-8 rounded-t-lg w-[250px] h-[200px]"
                                  src={I?.productId.image}
                                  alt="product"
                                  onError={(e) => { e.target.onerror = null; e.target.src = "/default.png" }} // fallback image
                                />
                              </div>
                              <div className='w-full pb-1 mb-3 bg-red-600 '></div>
                              <div className="px-5">
                                <h1 className='my-3 text-red-700 font-bold font-serif'>Name: {I?.productId.name}</h1>
                                <h5 className="text-[13px] tracking-tight text-gray-900 dark:text-white font-bold font-serif">
                                  Quantity: <span className='text-green-600'>{I?.quantity}</span>
                                </h5>
                                <div className="flex justify-between mt-1">
                                  <p className='text-red-700 mt-1 font-bold font-serif'>Price: {I?.price}<span className="text-blue-950">$</span></p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
