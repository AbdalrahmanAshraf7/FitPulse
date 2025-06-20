import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Dumble from "../../assets/images/Dmble.jpg";
import { Link } from 'react-router-dom';

export default function Exercises() {
  const [Exercises, setExercises] = useState([]);
  const [Page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [level, setLevel] = useState("All");
  const [muscleGroup, setMuscleGroup] = useState("All");
  const [disabledByTimeout, setDisabledByTimeout] = useState(false);

  async function getExercises(currentPage, currentLevel) {
    setLoading(true);
    try {
      let url = `https://fit-app-pink-omega.vercel.app/api/v1/exercises?limit=12&page=${currentPage}`;
      if (currentLevel !== "All") {
        url += `&level=${currentLevel}`;
      }
      if (muscleGroup !== "All") {
        url += `&keyword=${muscleGroup}`;
      }

      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      console.log(url);
      console.log(res);

      setExercises(res.data.data.exercises);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      getExercises(Page, level);
    }, 1000);

    return () => clearTimeout(timer);
  }, [Page, level, muscleGroup]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setDisabledByTimeout(true);
    setTimeout(() => {
      setDisabledByTimeout(false);
    }, 10000);
  };

  return (
    <>
      <div className="flex justify-end mt-28 container w-[77%] font-serif font-bold  ">
        {/* فلتر المستوى */}
        <select
          className="mb-8 p-2 rounded bg-black text-white self-end ms-[70px] text-center font-serif font-bold "
          value={level}
          onChange={(e) => {
            if (disabledByTimeout) return;
            setPage(1);
            setLevel(e.target.value);
            setDisabledByTimeout(true);
            setTimeout(() => {
              setDisabledByTimeout(false);
            }, 10000);
          }}
          disabled={disabledByTimeout}
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        {/* فلتر مجموعة العضلات */}
        <select
          className="mb-8 p-2 rounded bg-black text-white self-end ms-4 text-center font-serif font-bold "
          value={muscleGroup}
          onChange={(e) => {
            if (disabledByTimeout) return;
            setPage(1);
            setMuscleGroup(e.target.value);
            setDisabledByTimeout(true);
            setTimeout(() => {
              setDisabledByTimeout(false);
            }, 10000);
          }}
          disabled={disabledByTimeout}
        >
          <option value="All">All Muscles</option>
          <option value="Shoulder">Shoulder</option>
          <option value="Chest">Chest</option>
          <option value="Lower Back">Lower Back</option>
          <option value="Abdominals">Abdominals</option>
          <option value="Glutes">Glutes</option>
          <option value="Biceps">Biceps</option>
          <option value="Upper Back">Upper Back</option>
          <option value="Cardio">Cardio</option>
          <option value="Triceps">Triceps</option>
          <option value="Quadriceps">Quadriceps</option>
          <option value="Traps">Traps</option>
        </select>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 px-4 container relative font-serif font-bold  ">

     {loading && (
  <div className="fixed inset-0 bg-[#1f2937] bg-opacity-20 z-50 flex items-center justify-center">
    <div className="loadingHeart"></div>

  </div>
)}
        {loading ? (
          <p className="text-white text-xl font-serif font-bold ">Loading...</p>
        ) : Exercises.length > 0 ? (
          Exercises.map((E) => (
            <Link to={`/exercisesdetails/${E.name}`} key={E._id}>
              <div className="bg-gray-100 border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 h-[500px]">            
                <div className='flex justify-center'> 
                  <img className="p-8 rounded-t-lg w-[300px] h-[250px]" src={E.image} alt="exercise" onError={(e) => { e.target.onerror = null; e.target.src = Dumble; }}    />
                </div>
                <div className='w-full pb-1 mb-3 bg-red-600'></div>
                <div className="px-5 pb-5">
                  <h1 className='h4 font-serif font-medium my-3 text-red-700'>{E.name}</h1>
                  <h5 className="text font-semibold tracking-tight text-gray-900 dark:text-white h-[110px]">{E.description}</h5>
                  <p className="text-yellow-700 font-bold mt-3">Level: {E.level}</p>
                  <p className='text-red-700 mt-2'>Muscle Group: {E.primaryMuscleGroup}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-white text-xl">No exercises found.</p>
        )}
      </div>

      <div className="flex flex-col items-center my-5">
        <div className="inline-flex mt-2 xs:mt-0">
          <button
            onClick={() => handlePageChange(Math.max(Page - 1, 1))}
            disabled={Page === 1 || loading || disabledByTimeout}
            className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Prev
          </button>
          <button
            onClick={() => handlePageChange(Page + 1)}
            disabled={loading || disabledByTimeout}
            className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
        <p className="text-white mt-2">Page: {Page}</p>
      </div>
    </>
  );
}
