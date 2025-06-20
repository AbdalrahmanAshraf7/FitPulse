import { useContext, useEffect } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './comp/Home/Home.jsx'
import Signup from './comp/Signup/Signup.jsx'
import Login from './comp/Login/Login.jsx'
import Layout from './comp/Layout/Layout.jsx'
import Protector from './comp/Protectrouter/Protector.jsx'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import SunAndMoonProvider, { SunAndMoon } from './Context/SunAndMoon.jsx'
import Bulk from './comp/Bulk/Bulk.jsx'
import Shredded from './comp/Shredded/Shredded.jsx'
import Caloriecalc from './comp/Caloriecalc/Caloriecalc.jsx'
import UserProfile from './comp/UserProfile/UserProfile.jsx'
import CoachProfile from './comp/CoachProfile/CoachProfile.jsx'
import Products from './comp/Products/Products.jsx'
import Exercises from './comp/Exercises/Exercises.jsx'
import { CartProvider } from "./Context/CartContext.jsx";
import { NotificationProvider } from "./Context/NotificationsContext.jsx";
import UserProvider from './Context/Usercontext.jsx'
import ExercisesDetails from './comp/ExercisesDetails/ExercisesDetails.jsx'
import WorkoutList from './comp/WorkoutList/WorkoutList.jsx'
import CreatWorkout from './comp/CreatWorkout/CreatWorkout.jsx'
import SeeCoaches from './comp/SeeCoaches/SeeCoaches.jsx'
import  PreviousOrders from './comp/PreviousOrders/PreviousOrders.jsx'
import MySubscriptions from './comp/MySubscriptions/MySubscriptions.jsx'
import Notification from './comp/Notification/Notification.jsx'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import SubsToCoach from './comp/SubsToCoach/SubsToCoach.jsx'
import About from './comp/About/About.jsx'

function App() {
  
  const router = createBrowserRouter([
    {
      path: "", element: <Layout />, children: [
      { path: "", element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "signup", element: <Signup /> },
      { path: "login", element: <Login /> },
      { path: "about", element: <About /> },
      { path: "caloriecalc", element: <Protector><Caloriecalc /></Protector> },
      { path: "bulk", element: <Protector><Bulk /></Protector> },
      { path: "shredded", element: <Protector><Shredded /></Protector> },
      { path: "userprofile", element: <Protector><UserProfile /></Protector> },
      { path: "coachprofile", element: <Protector><CoachProfile /></Protector> },
      { path: "products", element: <Protector><Products /></Protector> },
      { path: "exercises", element: <Protector><Exercises /></Protector> },
      { path: "exercisesdetails/:name", element: <Protector><ExercisesDetails /></Protector> },
      { path: "substocoach/:id", element: <Protector><SubsToCoach /></Protector> },
      { path: "workoutlist", element: <Protector><WorkoutList /></Protector> },
      { path: "Creatworkout", element: <Protector><CreatWorkout /></Protector> },
      { path: "previousorders", element: <Protector><PreviousOrders /></Protector> },
      { path: "mysubs", element: <Protector><MySubscriptions /></Protector> },
      { path: "seecoaches", element: <Protector><SeeCoaches /></Protector> },
      { path: "notification", element: <Protector><Notification /></Protector> },
      { path: "userprofile/personalinfo", element: <Protector><CreatWorkout /></Protector> },
      { path: "userprofile/accountinfo", element: <Protector><CreatWorkout /></Protector> },
    ],
    }
  ])
  const queryClient = new QueryClient()

  return (
    <SunAndMoonProvider>
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <UserProvider>
          <NotificationProvider>
            <RouterProvider router={router} />
            <ToastContainer />
          </NotificationProvider>
        </UserProvider>
      </CartProvider>
    </QueryClientProvider>
  </SunAndMoonProvider>

  )
}

export default App
