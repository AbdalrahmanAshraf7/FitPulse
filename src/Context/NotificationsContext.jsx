import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


const NotificationContext = createContext();

export function NotificationProvider({ children }) {
    const [ResultsN, setResultsN] = useState(null)



async function getNotifications() {
  try {
    let res = await axios.get("https://fit-app-pink-omega.vercel.app/api/v1/notifications",{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });

    setResultsN(res.data.results)

    console.log(res)

   
  } catch (err) {
     if(err.response && err.response.status === 404){
      setResultsN("0");
    } else {
      console.log(err);
    }
  
  }
}

useEffect(() => {
 getNotifications()
  

  return () => {
    
  }
}, [])







  return (
    <NotificationContext.Provider value={{ResultsN,setResultsN,getNotifications}} >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationContext);
}
