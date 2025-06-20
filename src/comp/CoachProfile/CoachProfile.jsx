import React, { useEffect, useState } from 'react';
import { Star, CheckCircle, Clock, DollarSign, Award, Users, Calendar } from 'lucide-react';
import coachData from "./jsonCoash.jsx";

export default function CoachProfile (){
    const [coach, setCoach] = useState(null);
    const [loading, setLoading] = useState(true);
    let specialties = coachData.specialties;
    let specialtiesArray = specialties.split(",");
    console.log(coachData.reviews[1].reviewId);

    useEffect(() => {
        setCoach(coachData);
        setLoading(false);
    }, []);

    // Format date to a readable string
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return <>
        <div className='mt-[100px]'>
            <div className='mt-[30px] bg-gray-200 container mx-auto w-[90%] p-5 rounded-lg'>
            <h1>{coachData.user.name}</h1>
            <p>{coachData.rating} <span>({coachData.reviewCount} reviews)</span></p>
            <p>Experience : {coachData.yearsExperience} Years</p>
            <p>Price : {coachData.hourlyRate} / hour</p>
            <p>{coachData.isAcceptingClients ? <div>Accepting new clients</div> : <div>Not able to join now</div>}</p>

            </div>
        </div>

        <div className='mt-[30px] bg-gray-200 container mx-auto w-[90%] p-5 rounded-lg'>
            <h1>About</h1>
            <p>{coachData.biography}</p>
        </div>

        <div className='mt-[30px] bg-gray-200 container mx-auto w-[90%] p-5 rounded-lg'>
            <h1>Specialties</h1>
            <p className='flex gap-4 rounded-lg container'>{specialtiesArray.map((SA, index) => (
                <div key={index} className='bg-red-500 p-5 my-5 rounded-lg'>{SA}</div>
            ))}</p>
        </div>

        <div className='mt-[30px] bg-gray-200 container mx-auto w-[90%] p-5 rounded-lg'>
            <h1>Certifications</h1>
            <p>{coachData.certifications}</p>
        </div>

        <div className='mt-[30px] bg-gray-200 container mx-auto w-[90%] p-5 rounded-lg mb-[50px]'>
            <h1>Recent Reviews</h1>
            <p>{coachData.reviews.map((rev, index) => (
                <div key={index} className='mb-4 p-3 border rounded'>
                    <div><span>Rating:</span> {rev.rating}</div>
                    <div>{rev.comment}</div>
                    <div>{formatDate(rev.createdAt)}</div>
                </div>
            ))}</p>
        </div>
    </>;
};

