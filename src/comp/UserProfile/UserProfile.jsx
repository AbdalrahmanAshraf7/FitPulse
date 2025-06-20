import { jsx } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import { User, Calendar, Clock, Globe, Award, Settings } from 'lucide-react';
import {jwtDecode} from 'jwt-decode';
import { useFormik } from 'formik';
import axios from 'axios';
import { Link, NavLink, useNavigate } from 'react-router-dom'


import userData from './jsonUser.jsx';

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [decodedToken, setdecodedToken] = useState("");
  const [Userprofile, setUserprofile] = useState("");
    const [toggle, setToggle] = useState(true)

    const [AccountInfo, setAccountInfo] = useState("")
    const [PersonalInfo, setPersonalInfo] = useState("hidden")
  
  console.log(Userprofile, "xyzu");



  function PersonalInfoF (){
    setPersonalInfo(" ")
    setAccountInfo("hidden")
  }
  function AccountInfoF (){
   
    setAccountInfo(" ")
    setPersonalInfo("hidden")
  
  }













  async function getProfile() {
    try {
      let res = await axios.get("https://fit-app-pink-omega.vercel.app/api/v1/users/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      setUserprofile(res.data.data.profile);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getProfile();
    return () => {};
  }, []);

  async function editProfile(values) {
            setLoading(true);

    try {
      let res = await axios.patch("https://fit-app-pink-omega.vercel.app/api/v1/users/update-profile", values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      console.log(res);
      getProfile();
      setLoading(false)
      setToggle(true);

    } catch (err) {
      console.log(err);
      setLoading(false)

    }
  }

  async function handleAvatarUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      await axios.patch("https://fit-app-pink-omega.vercel.app/api/v1/users/avatar", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Avatar updated successfully!");
      getProfile(); 
    } catch (error) {
      console.error(error);
      alert("Failed to update avatar.");
    }
  }

  let formik = useFormik({
    initialValues: {
      gender: "",
      age: "",
      height: "",
      weight: "",
      fitnessGoal: " ",
      activityLevel: ""
    },
    onSubmit: editProfile
  });



  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setdecodedToken(decoded);
        console.log("Decoded JWT:", decoded);
      } catch (err) {
        console.error("Invalid token:", err.message);
      }
    }
  }, [token]);

  useEffect(() => {
    setUser(userData);
    setLoading(false);
  }, []);

  if (loading) {
    return <div css={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading user data...</div>;
  }

  if (!user) {
    return <div css={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>User not found</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

 

  return <>


 <div className='bg-red-900 h-lvh flex justify-center items-center mt-16 profile-Header font-serif'>

<div className="w-[95%]   m:w-[90%] md:w-[70%] lg:w-[50%] xl:w-[33%] mx-auto bg-gray-100 border border-black rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
    <div className="flex justify-end px-4 pt-4">
      <button id="dropdownButton" data-dropdown-toggle="dropdown" className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700  dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
        <span className="sr-only">Open dropdown</span>
        <i class="fa-solid fa-gear text-2xl text-black hover:text-gray-500"  onClick={() => setToggle(!toggle)}></i>
        <input
        type="file"
        id="avatarUpload"
        accept="image/*"
        onChange={handleAvatarUpload}
        style={{ display: "none" }}
      />
      </button>
      {/* Dropdown menu */}
      <div id="dropdown" className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
        <ul className="py-2" aria-labelledby="dropdownButton">
          <li>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Edit</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Export Data</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
          </li>
        </ul>
      </div>
    </div>
    <div className="flex flex-col items-center ">
      <div><label class="fa-solid fa-pen-to-square cursor-pointer hover:text-gray-400  text-2xl" htmlFor="avatarUpload" ></label>
      <input
        type="file"
        id="avatarUpload"
        accept="image/*"
        onChange={handleAvatarUpload}
        style={{ display: "none" }}
      /></div>

      <p className='text-[10px] font-bold mb-2'>Edit Image</p>
      <img className="w-32 h-32 mb-3 rounded-full shadow-lg border-4 border-black" src={Userprofile.avatar} alt="" />
      <h5 className="mb-1 text-xl capitalize text-gray-900 dark:text-white font-bold font-serif">{Userprofile.username}</h5>
      <span className="text-sm text-black ">trainee</span>

<div className="bg-black w-full rounded-tr-lg flex justify-center items-center mt-3 rounded-tl-md">
    <nav className="bg-black border-gray-200 dark:bg-gray-900 dark:border-gray-700 w-full mx-auto rounded-tr-lg rounded-tl-md   ">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 rounded-lg rounded-tr-lg rounded-tl-md">
   
    
    <div className=" w-full md:block md:w-auto bg-black mx-auto" id="navbar-dropdown rounded-lg">
      <ul className="lg:gap-5 md:gap-7  flex flex-col font-medium   mt-4 border border-gray-100   md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 rounded-tl-md  rounded-tr-lg  bg-black lg:justify-center lg:items-center ">
             
              <div className='flex flex-col font-medium     md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  bg-black rounded-lg'>
              <li className=''>
                <span  className=" cursor-pointer block font-bold  px-1 text-white rounded-sm aria-[current=page]:bg-yellow-600 md:p-0  md:aria-[current=page]:bg-transparent md:aria-[current=page]:text-yellow-600 hover:text-gray-400 " onClick={AccountInfoF}>Account info</span>
              </li>
             
              <li>
                <span  className="block font-bold cursor-pointer   px-1 text-white rounded-sm aria-[current=page]:bg-yellow-600 md:p-0  md:aria-[current=page]:bg-transparent md:aria-[current=page]:text-yellow-600 hover:text-gray-400 " onClick={PersonalInfoF}> Personal Info</span>
              </li>
              </div>
        </ul>
    </div>
  </div>
</nav>

    </div>    
    
      
    </div>

    <div className={` container bg-gray-100 w-full h-[170px] transition-all duration-500 ease-in-out overflow-hidden text-black rounded-b-md  ${AccountInfo}`}>

      <div className=' mt-4'>
        
      <div className='mt-7 '><span className='font-bold'>E-mail : </span><span>{Userprofile.email}</span></div>
      <div className=' my-3'><span className='font-bold'>Id : </span><span>{Userprofile._id}</span></div>

      </div>



    </div>
    <div className={` container bg-gray-100 w-full h-[170px] transition-all duration-500 ease-in-out overflow-hidden text-black ${PersonalInfo}  `}>

      <div className='p-5 flex justify-center gap-12'>

        <div>
          <div className='my-3 '><span className='font-bold'>Height:  </span><span>{Userprofile.height}</span> cm</div>
      <div className=' my-3'><span className='font-bold'>Weight: </span><span>{Userprofile.weight}</span> kg</div>
      <div className='my-3 '><span className='font-bold'>Gender:  </span><span>{Userprofile.gender}</span></div>

        </div>

        <div>
          <div className=' my-3'><span className='font-bold'>Fitness Goal: </span><span>{Userprofile.fitnessGoal}</span></div>
      <div className='my-3'><span className='font-bold'>Age:  </span><span>{Userprofile.age}</span></div>
      <div className=' my-3'><span className='font-bold'>Activity Level: </span><span>{Userprofile.activityLevel}</span></div>

        </div>
      
      

      </div>



    </div>
  </div>

  

  

   </div>


       





   


      <form className={` lg:w-[70%] mt-[50px] mb-10 container bg-gray-100 p-5 rounded-sm shadow-md ${toggle==true? "hidden":" "}`} onSubmit={formik.handleSubmit}>
        <h2 className='py-6 mb-7 text-center font-serif'>Edit Profile</h2>

        <div className="mb-5">
          <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900">Gender</label>
          <select
            id="gender"
            name="gender"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.gender}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="mb-5">
          <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900">Age</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.age}
            type="number"
            id="age"
            name="age"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="height" className="block mb-2 text-sm font-medium text-gray-900">Height (cm)</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.height}
            type="number"
            id="height"
            name="height"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="weight" className="block mb-2 text-sm font-medium text-gray-900">Weight (kg)</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.weight}
            type="number"
            id="weight"
            name="weight"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>

        <div className="mb-5">
          <label htmlFor="fitnessGoal" className="block mb-2 text-sm font-medium text-gray-900">Fitness Goal</label>
          <select
            id="fitnessGoal"
            name="fitnessGoal"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.fitnessGoal}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          >
            <option value="">Select goal</option>
            <option value="Lose Weight">Lose Weight</option>
            <option value="Gain Weight">Gain Weight</option>
            <option value="Get Fitter">Get Fitter</option>
            <option value="Gain More Flexible">Gain More Flexible</option>
            <option value="Learn The Basic">Learn The Basic</option>
            <option value="Muscle Gain">Muscle Gain</option>
            <option value="Endurance Training">Endurance Training</option>
            <option value="General Fitness">General Fitness</option>
          </select>
        </div>

        <div className="mb-5">
          <label htmlFor="activityLevel" className="block mb-2 text-sm font-medium text-gray-900">Activity Level</label>
          <select
            id="activityLevel"
            name="activityLevel"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.activityLevel}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          >
            <option value="">Select level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        {loading? <button type="submit" className="text-white bg-black hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Loading...</button>:
   <button type="submit" className="text-white bg-black hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
  }
      </form>
    
  
  </>;
}
