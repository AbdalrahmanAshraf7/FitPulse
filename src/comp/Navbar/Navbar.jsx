 import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCart } from "../../Context/CartContext";
import { useNotifications } from "../../Context/NotificationsContext.jsx";
import { UserContext } from "../../Context/Usercontext.jsx";
import axios from 'axios'
import { toast } from "react-toastify";
import { useFormik } from 'formik';
import logo from "../../assets/images/title.jpg"
import * as Yup from "yup"




export default function Navbar() {

  const [toggle, setToggle] = useState(true)
  const [toggleF, setToggleF] = useState(true)
  const [toggleF2, setToggleF2] = useState(true)
  const [dropdown, setDropDwon] = useState(true)
  const [loading, setLoading] = useState(false);
  const [HiddenForm, setHiddenForm] = useState("hidden")
  const { cart, deleteFromCart,getCart,Results,setResults,setCart } = useCart();
  const { ResultsN,setResultsN,getNotifications} = useNotifications();
const { token, setToken, userData ,setGetToken, GetToken } = useContext(UserContext); 


console.log(GetToken,"NAAAAAAAAAAAAAAV token")



    let navigate = useNavigate()

   const [isVisible, setIsVisible] = useState(false);
  
    const toggleSidebar = () => {
      setIsVisible(!isVisible);
    };
  
  

  let nav = useNavigate()


  


  function toggleRequiem2(){

    setToggleF2(!toggleF2)
    if(dropdown==false){
      setDropDwon(true)
    }
    
  }

  function toggleRequiem(){

    setToggleF(!toggleF)
    if(dropdown==false){
      setDropDwon(true)
    }
    
  }

  function toggleRequiemx(){

    setDropDwon(!dropdown)
    if(toggleF==false){
      setToggleF(true)
    }
    
  }


async function Booking(values) {
setLoading(true)
  try{

    let res = await axios.post("https://fit-app-pink-omega.vercel.app/api/v1/bookings",values,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      console.log(res,"Paymeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeent")
      getCart()

  }catch(err){
    console.log(err)
  }

  finally {
      setLoading(false);
    }
  
}






    

function LogOut (){

  localStorage.removeItem("token")
  navigate("/login")
   getCart()
   setResults(null)
   setResultsN(null)
   setCart(null)


}






async function DeleteFromCart(id) {
    setLoading(true);
  try {
    const res = await axios.delete(
      `https://fit-app-pink-omega.vercel.app/api/v1/carts/${id}/all`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log("✅ Added to cart:", res.data);
     getCart()
          toast.success("Removed From Cart");
     
  
  } catch (err) {
    console.error("❌ Error adding to cart:", err);
  }


   finally {
      setLoading(false);
    }
}

  



 let validationSchema = Yup.object().shape({
    cardNumber:Yup.string().required().matches(/^\d{4}( \d{4}){3}$/,"Please enter a 16-digit number grouped in sets of 4 separated by spaces, like: 1234 5678 9012 3456."),
  })






const formik = useFormik({
  initialValues: {
    cardNumber: '',
  },
  validate: values => {
    const errors = {};
    if (!values.cardNumber) {
      errors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(values.cardNumber.replace(/\s/g, ''))) {
      errors.cardNumber = 'Card number must be 16 digits';
    }
    return errors;
  },
  onSubmit: async (values) => {
    setHiddenForm("hidden");
    try {
      await Booking(values);  // استدعاء دالة الدفع هنا وتمرير القيم
      toast.success("Payment successful!");
      setResults(null)
    } catch (error) {
      toast.error("Payment failed!");
    }
  },
});











  return <>


<nav className=" border-gray-200  fixed w-full bg-black z-[999] font-serif ">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <div to="#" className="flex flex-wrap items-center space-x-3 rtl:space-x-reverse  lg:w-1/3 md:w-auto ">
    <Link to={`/home`}>
    <img src={logo} alt="" className='bg-slate-50 w-[70px] rounded-full shadow-lg border-4 border-black' />
    </Link>
    <Link to={`/home`}>
      <span className="self-center text-2xl font-semibold whitespace-nowrap hover:text-red-600  text-white">Fit Pulse </span>
    </Link>
    </div>
<div className='flex gap-5 '>

<Link to={`/notification`} onClick={()=>setResultsN("")}>
<div className="relative flex flex-col">
    {ResultsN==null ? " ":  <i className="fa-solid fa-circle text-red-800 absolute text top-[-30%] left-[10%] me-[70%] z-30 rounded-circle"></i>
}
  <span className=' absolute text-white top-[-52%] left-[20%] ms-[2px] mb-[5px] font-bold z-50'>{ResultsN > 0 ? "!" : " "}</span>
  <br />
  
  {isVisible ? (
    <i class="fa-solid fa-bell text-white text-2xl hover:text-red-600"></i>
  ) : (
    <i class="fa-solid fa-bell text-white text-2xl hover:text-red-600"></i>
  )}
</div>


</Link>


  <button onClick={toggleSidebar}>
  <div className="relative flex flex-col">
    {Results==null ? " ":  <i className="fa-solid fa-square text-red-800 absolute text-2xl top-[-52%] left-[20%] z-30"></i>
}
  <span className=' absolute text-white top-[-52%] left-[20%] ms-[7px] mb-[5px] font-bold z-50'>{Results}</span>
  <br />
  
  {isVisible ? (
    <i className="fa-solid fa-cart-shopping text-red-600 duration-500 text-2xl me-5 relative"></i>
  ) : (
    <i className="fa-solid fa-cart-shopping text-white text-2xl duration-300 me-12"></i>
  )}
</div>




</button>

</div>


    
    <button onClick={()=>setToggle(!toggle)} data-collapse-toggle="navbar-multi-level" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-gray-200  z-[999999999999]" aria-controls="navbar-multi-level" aria-expanded="false">
      <span className="sr-only">Open main menu</span>
      <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
      </svg>
    </button>

    <div className={toggle==true? "hidden  lg:w-1/2 md:w-auto md:block   " :"  w-full md:block md:w-auto" }id="navbar-multi-level">
      <ul className="lg:gap-10 md:gap-7  flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  bg-black lg:justify-center lg:items-center">
       
        <div className='flex flex-col font-medium p-4 md:p-0    md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  bg-black'>
        <li className='bg-black'>
          <NavLink to="home" className="font-bold  block py-2 px-3 text-white rounded-sm aria-[current=page]:bg-red-600 md:p-0  md:aria-[current=page]:bg-transparent md:aria-[current=page]:text-red-600 " onClick={()=>setToggle(true)}>Home</NavLink>
        </li>
       
        {GetToken && <li>
          <NavLink to="products" className="block font-bold  py-2 px-3 text-white rounded-sm aria-[current=page]:bg-red-600 md:p-0  md:aria-[current=page]:bg-transparent md:aria-[current=page]:text-red-600" onClick={()=>setToggle(true)}><p className='flex gap-1'> <span>Products</span>  <span></span> </p></NavLink>
        </li> }
     {GetToken&&    <li>
          <NavLink to="exercises" className="block font-bold  py-2 px-3 text-white rounded-sm aria-[current=page]:bg-red-600 md:p-0  md:aria-[current=page]:bg-transparent md:aria-[current=page]:text-red-600" onClick={()=>setToggle(true)}>Exercises</NavLink>
        </li>}
       


{GetToken &&
        <li className='bg-black cursor-pointer' onClick={()=>toggleRequiem2()}>
          <div  to="" id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className="flex items-center justify-between w-full py-2 px-3  md:hover:bg-transparent md:border-0  md:p-0 md:w-auto  text-white aria-[current=page]:bg-yellow-600 md:aria-[current=page]:bg-transparent  hover:bg-yellow-600 font-bold "  ><p className='flex hover:text-red-600 '> <span>Work</span><span>out</span> </p> <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 4 4 4-4" />
            </svg></div>
          {/* Dropdown menu */}
          <div id="dropdownNavbar" className={toggleF2==true?" hidden  z-10 font-normal absolute bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 ":"   z-10 font-normal absolute bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 "}>
            <ul className="py-2 text-sm text-gray-700 " aria-labelledby="dropdownLargeButton">
              <li>
                <NavLink to="Creatworkout" className="block px-4 py-2  hover:bg-yellow-600 "  onClick={()=>setToggle(true)}      >Creat New Workout </NavLink>
              </li>
              <li>
                <NavLink to="workoutlist" className="block px-4 py-2  hover:bg-yellow-600 "  onClick={()=>setToggle(true)}      >My Workout List</NavLink>
              </li>
              <li>
                <NavLink to="seecoaches" className="block px-4 py-2  hover:bg-yellow-600 "  onClick={()=>setToggle(true)}      >See Coaches</NavLink>
              </li>
              

              <li aria-labelledby="dropdownNavbarLink">
                <NavLink  id="doubleDropdownButton" data-dropdown-toggle="doubleDropdown" data-dropdown-placement="right-start" type="button" className="flex items-center justify-between w-full px-4 py-2 hover:bg-yellow-600 hidden  ">Dropdown<svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 4 4 4-4" />
                  </svg></NavLink>
                <div id="doubleDropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 ">
                  <ul className="py-2 text-sm text-gray-700 " aria-labelledby="doubleDropdownButton">
                    <li>
                      <NavLink to="bulk" className="block px-4 py-2 hover:bg-gray-100  text-white" onClick={()=>setToggle(true)}>Bulk</NavLink>
                    </li>
                    <li>
                      <NavLink to="shredded" className="block px-4 py-2 hover:bg-gray-100 " onClick={()=>setToggle(true)}>Shredded</NavLink>
                    </li>
                    <li>
                      <NavLink to="#" className="block px-4 py-2 hover:bg-gray-100 " onClick={()=>setToggle(true)}>Billing</NavLink>
                    </li>
                    <li>
                      <NavLink to="#" className="block px-4 py-2 hover:bg-gray-100 " onClick={()=>setToggle(true)}>Rewards</NavLink>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
            <div className="py-1">
              
            </div>
          </div>
        </li>}

       {GetToken&& <li className='bg-black cursor-pointer' onClick={()=>toggleRequiem()}>
          <div  to="" id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className="flex items-center justify-between w-full py-2 px-3  md:hover:bg-transparent md:border-0  md:p-0 md:w-auto  text-white aria-[current=page]:bg-yellow-600 md:aria-[current=page]:bg-transparent  hover:bg-yellow-600 font-bold "  ><p className='flex gap-1 hover:text-red-600'> <span>Other</span>  <span>Features</span> </p> <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 4 4 4-4" />
            </svg></div>
          {/* Dropdown menu */}
          <div id="dropdownNavbar" className={toggleF==true?" hidden  z-10 font-normal absolute bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 ":"   z-10 font-normal absolute bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 "}>
            <ul className="py-2 text-sm text-gray-700 " aria-labelledby="dropdownLargeButton">
              <li>
                <NavLink to="caloriecalc" className="block px-4 py-2  hover:bg-yellow-600 "  onClick={()=>setToggle(true)}      >Calorie Calculator</NavLink>
              </li>
              
             

             
            </ul>
            <div className="py-1">
              
            </div>
          </div>
          
        </li>}

        </div>

        

        <div className='flex flex-col font-medium p-4 md:p-0    md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0   bg-black'>
        <li className='bg-black'>
          <button onClick={()=>toggleRequiemx()} id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className="font-bold flex items-center justify-between w-full py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-600 md:p-0 md:w-auto  text-white hover:bg-yellow-600 ">
            My account 
            <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 4 4 4-4" />
            </svg></button>
          {/* Dropdown menu */}
          <div id="dropdownNavbar" className={dropdown==true?"hidden z-10 font-normal absolute bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 ":" z-10 font-normal absolute bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44"}>
            <ul className="py-2 text-sm text-gray-700 " aria-labelledby="dropdownLargeButton">
              <li>
                <NavLink to="userprofile" className="block px-4 py-2 hover:bg-gray-100 " onClick={()=>setToggle(true)}>My Profile</NavLink> 
              </li>
             
              <li>
                <NavLink to="previousorders" className="block px-4 py-2 hover:bg-gray-100 " onClick={()=>setToggle(true)}> My previous orders</NavLink> 
              </li>
              <li>
                <NavLink to="mysubs" className="block px-4 py-2 hover:bg-gray-100 " onClick={()=>setToggle(true)}>My subscriptions</NavLink> 
              </li>
             
              <li>
                <NavLink to="signup" className="block px-4 py-2 hover:bg-gray-100 cursor-pointer  " onClick={()=>setToggle(true)}>Sign up</NavLink>
              </li>
              <li>
                <NavLink to="login" className="block px-4 py-2 hover:bg-gray-100  cursor-pointer  " onClick={()=>setToggle(true)}>Logn in</NavLink>
              </li>
            </ul>
            <div className="py-1">
              <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer " onClick={()=>LogOut()}>Sign out</span>
            </div>
          </div>
        </li>
        </div>
        
      </ul>
    </div>

    
    
  </div>
  
</nav>





<div className="w-full text-center fixed z-[99999999999999999] ">


        <button
          className= " absolute  top-5 left-[30%] "
          
        >
        </button>
      </div>

      <div
        className={` top-0 left-0  w-96 h-screen p-4 overflow-y-auto bg-white dark:bg-gray-800 transition-transform  z-[9999999999999999999999999999999] fixed duration-1000 ${isVisible ? '' : 'hidden '}`}
      >
        <h5 className="text-base  text-gray-500 uppercase dark:text-gray-400 font-serif font-bold">Quick cart</h5>
        <div className='flex gap-10 mt-2'>

        <p className='text-sm mt-2 font-bold font-serif'>This is a quick access to cart. </p>
        <button className='bg-green-700 hover:bg-green-400 text-white rounded-md p-2 font-bold font-serif mt-1' disabled={Results === null}  onClick={()=>setHiddenForm(" ")}>Payment</button>
        </div>
         <div  className={`fixed inset-0 bg-[#1f2937] bg-opacity-55 z-50 flex items-center justify-center ${HiddenForm} `}   >
    <div>


<form className="w-[400px]  bg-gray-100 rounded-md p-10" onSubmit={formik.handleSubmit} >
  <div className='flex justify-end mb-1 ' onClick={()=>setHiddenForm("hidden")}>
  <i className="fa-solid fa-square-xmark cursor-pointer hover:text-gray-500 text-xl"></i>
  </div>

  <div className="mb-5">
    <label htmlFor="cardNumber" className="block mb-2 text-sm  text-gray-900 dark:text-white font-serif font-bold">Enter Your Card Number</label>
    <input 
  name="cardNumber"
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  value={formik.values.cardNumber} type="tel" id="cardNumber" className=" text-xs bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder" placeholder="Enter 16 digits in groups of 4, like: 1234 5678 9012 3456" required />
  </div>

   {formik.errors.cardNumber&&formik.touched.cardNumber &&<div className="p-4 mb-4 text-sm text-red-950 rounded-lg bg-red-300 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">Danger alert!</span> {formik.errors.cardNumber}
</div>}
{cart==null?  <button  className="bg-green-700 hover:bg-green-400 text-white rounded-md p-2 font-bold font-serif" >Payment</button>:  <button type="submit" className="bg-green-700 hover:bg-green-400 text-white rounded-md p-2 font-bold font-serif" >Payment</button>

}
 
</form>

    </div>

  </div>
        <button
          type="button"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={toggleSidebar}
        >
          <i className="fa-solid fa-square-xmark font-bold text-xl"></i>
          <span className="sr-only">Close menu</span>
        </button>

        

        

        <div className='bg-white p-5 h-[100%] flex-nowrap gap-4'>


           {loading && (
  <div className="fixed inset-0 bg-[#1f2937] bg-opacity-20 z-50 flex items-center justify-center">
    <div className="loadingHeart"></div>

  </div>
)}
    

          

          


          
          

          {
            cart?.map((C,index)=>{return<>

              <div key={C.product.productId} className="bg-gray-100 border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 h-[360px] my-3 ">
    
               <div className=' flex justify-center ' key={C.product.productId}> 
                
                {/* border-[8px] border-red-600  */}
                <img className="p-8 rounded-t-lg w-[250px] h-[200px] " src={C?.product?.image} alt="product" key={C.product.productId} />
              </div>
              <div className='w-full pb-1 mb-1 bg-red-600 ' key={C.product.productId}></div>
              <div className="px-5 ">
                <h1 className=' h4  my-1 text-red-700 font-bold font-serif' key={C.product.productId}>Name: {C?.product?.name}</h1>
                
              
              
             
                <div className="flex justify-between" key={C.product.productId}>
                <p className='text-red-700  font-bold font-serif ' key={C.product.productId}>Quantity: {C?.quantity}</p>
                </div>
                <div className="flex justify-between mt-1"key={C.product.productId}>
                <p className='text-red-700 mt-1 font-bold font-serif' key={C.product.productId}>Price: {C?.price}<span className="text-blue-950">$</span></p>
                </div>

                <div className='flex justify-end cursor-pointer mt-4 text-xl' key={C.product.productId} onClick={()=>DeleteFromCart(C.product.productId)}>
                  <i className="fa-solid fa-trash-can text-red-700 hover:text-red-400"></i>
                </div>
              </div>
            </div>
      
            
            
            </>})
          }
         



        </div>

        <ul className="space-y-2 font-medium" >
       
        </ul>
      </div>






  
  
  </>
}
