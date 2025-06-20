import React, { createContext, useState } from 'react'



export let SunAndMoon = createContext()

export default function SunAndMoonProvider({children}) {
    const [togglex, setTogglex] = useState(true)


  return <SunAndMoon.Provider value={{togglex,setTogglex}}>
    {children}

  </SunAndMoon.Provider>
  
}
