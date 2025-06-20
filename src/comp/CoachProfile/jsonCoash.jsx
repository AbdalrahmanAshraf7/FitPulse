const coachData ={
    "coachId": 123,
    "userId": 456,
    "biography": "Certified personal trainer with over a decade of experience helping clients achieve their fitness goals. I specialize in strength training, weight management, and rehabilitation exercises for those recovering from injuries. My training philosophy focuses on sustainable lifestyle changes rather than quick fixes.",
    "specialties": "Strength Training, Weight Loss, Rehabilitation, Nutrition Planning, HIIT Workouts",
    "certifications": "NASM Certified Personal Trainer, ACE Fitness Nutrition Specialist, ISSA Corrective Exercise Specialist",
    "yearsExperience": 12,
    "hourlyRate": 65.00,
    "isVerified": true,
    "isAcceptingClients": true,
    "rating": 4.8,
    "reviewCount": 47,
    "createdAt": "2022-03-15T10:30:00Z",
    "updatedAt": "2024-12-05T14:45:22Z",
    "user": {
      "userId": 456,
      "name": "Sarah Johnson",
      "email": "sarah.johnson@example.com",
      "profileImageUrl": "https://example.com/profiles/sarah-johnson.jpg"
    },
    "clients": [
      {
        "clientId": 789,
        "userId": 790,
        "startDate": "2023-01-10T00:00:00Z",
        "status": "Active"
      },
      {
        "clientId": 791,
        "userId": 792,
        "startDate": "2023-04-22T00:00:00Z",
        "status": "Active"
      },
      {
        "clientId": 793,
        "userId": 794,
        "startDate": "2022-08-15T00:00:00Z",
        "status": "Inactive"
      }
    ],
    "reviews": [
      {
        "reviewId": 111,
        "clientId": 789,
        "rating": 5,
        "comment": "Sarah has been incredible in helping me achieve my weight loss goals. Highly recommend!",
        "createdAt": "2023-06-20T15:30:00Z"
      },
      {
        "reviewId": 112,
        "clientId": 793,
        "rating": 4,
        "comment": "Great trainer with excellent knowledge about strength training techniques.",
        "createdAt": "2023-02-10T09:15:00Z"
      }
    ]
  }

  export default coachData ;
  