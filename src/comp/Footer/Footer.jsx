import React, { useEffect, useState } from 'react';
import TextTransition, { presets } from "react-text-transition";
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from "../../assets/images/title.jpg"



const TEXTS = [
  "Calculate your daily calorie needs based on your goal and body weight ",
  "Aim for 8-12 reps per set for muscle hypertrophy",
  "Choose weights that make you reach muscle failure by the last rep",
  "Split your workouts to target different muscle groups throughout the week",
  "Always warm up and stretch before and after training",
  "Focus on compound exercises like squats, deadlifts, and bench press",
  "Rest 60 to 90 seconds between sets for hypertrophy training",
  "Consume 1.6 to 2.2 grams of protein per kilogram of body weight daily",
  "Distribute protein intake evenly across your meals",
  "Include healthy fats like olive oil, nuts, and avocados in your diet",
  "Eat carbohydrates before and after workouts to boost energy and recovery",
  "Stay hydrated by drinking 3 to 4 liters of water per day",
  "Have a post-workout meal with protein and carbs to enhance recovery",
  "Limit processed sugars and junk food for optimal results",
  "Increase your calorie intake by 10-20% if your goal is muscle gain",
  "Prioritize consistent training and quality sleep for better muscle growth",
  "Progressively overload by increasing weights or reps over time",
  "Track your progress regularly to adjust your plan accordingly",
  "Don’t skip leg day—strong legs support overall strength",
  "Incorporate rest days to allow muscles to repair and grow",
  "Balance cardio sessions with strength training to improve endurance",
  "Use proper form to avoid injuries and maximize effectiveness",
  "Include protein-rich snacks between meals to meet daily targets",
  "Limit alcohol consumption as it impairs muscle recovery",
  "Prepare meals ahead to maintain nutritional consistency",
];


export default function Footer() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % TEXTS.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='w-full'>
      
      {/* الجزء العلوي - نصوص متحركة */}
      <div className='bg-blue-950 text-slate-100 p-5 text-center'>
        <h1 className='text-3xl lg:text-3xl font-serif flex justify-center items-center mt-4    '>
          <TextTransition springConfig={presets.wobbly}>
            <span className='text-red-600'> <span className='text-slate-100'>Today's tip : </span>  ❤</span> ' {TEXTS[index]} ' <span className='text-red-600'>❤</span>
          </TextTransition>
        </h1>
      </div>

      {/* الجزء السفلي - كلمة footer */}
      <div className='bg-black text-slate-100 py-[100px] text-center flex gap-48 p-[100px] justify-center  w-[100%] font-serif font-bold'>
 
        <div className='flex flex-col gap-2'>
          <Link to={`/about`}>
          <span className='hover:text-red-600 text-xl'>About Us</span>
          </Link>
          <span> Contact Us :<br></br> <span className='font-sans'>01015471431</span> <i class="fa-solid fa-mobile-screen-button text-red-700"></i></span>


        </div>

        <div className=''>

          <div className='flex flex-column justify-center items-center'>
            <div className='sm:flex-col '>
              <span className="px-6 inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-white">
  <a href="https://www.facebook.com/?locale=ar_AR" target="_blank" rel="noreferrer">
    <i className="fa-brands fa-facebook text-2xl cursor-pointer hover:text-red-600"></i>
  </a>
</span>

<span className="px-6 inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-white">
  <a href="https://x.com/" target="_blank" rel="noreferrer">
    <i className="fa-brands fa-square-x-twitter text-2xl cursor-pointer hover:text-red-600"></i>
  </a>
</span>

<span className="px-6 inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-white">
  <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
    <i className="fa-brands fa-square-instagram text-2xl cursor-pointer hover:text-red-600"></i>
  </a>
</span>

<span className="px-6 inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-white">
  <a href="https://discord.com/" target="_blank" rel="noreferrer">
    <i className="fa-brands fa-discord text-2xl cursor-pointer hover:text-red-600"></i>
  </a>
</span>

            </div>
                        

          </div>

          <span>
        Fit Pulse — All rights reserved © 2025
          </span>

          <span className='flex justify-center items-center'>
            <img src={logo} className='bg-slate-50 w-[70px] rounded-full shadow-lg border-4 border-black'   alt="" />
          </span>
        </div>

      

      </div>
    </div>
  );
}
