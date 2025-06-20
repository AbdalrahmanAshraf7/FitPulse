// src/data/mockData.js
export const mockProgressData = [
    { date: '2023-06-01', weight: 82.5, bodyFat: 18.2 },
    { date: '2023-06-08', weight: 81.8, bodyFat: 17.9 },
    { date: '2023-06-15', weight: 81.2, bodyFat: 17.6 },
    { date: '2023-06-22', weight: 80.7, bodyFat: 17.3 },
    { date: '2023-06-29', weight: 80.0, bodyFat: 16.9 },
    { date: '2023-07-06', weight: 79.5, bodyFat: 16.7 }
  ];
  
  export const mockWorkouts = {
    completed: [
      { id: 101, name: 'Upper Body Day', type: 'strength', date: '2023-07-10T10:00:00', duration: 45 },
      { id: 102, name: 'Cardio Session', type: 'cardio', date: '2023-07-08T15:30:00', duration: 30 }
    ],
    upcoming: [
      { id: 103, name: 'Leg Day', type: 'strength', date: '2023-07-12T08:00:00', duration: 50 },
      { id: 104, name: 'HIIT Workout', type: 'hiit', date: '2023-07-14T17:00:00', duration: 25 },
      { id: 105, name: 'Yoga Session', type: 'flexibility', date: '2023-07-16T09:00:00', duration: 60 }
    ]
  };
  
  export const mockMeals = [
    {
      id: 201,
      name: 'Protein Breakfast Bowl',
      type: 'Breakfast',
      calories: 450,
      protein: 35,
      carbs: 40,
      fat: 15,
      imageUrl: '/images/meals/protein-bowl.jpg'
    },
    {
      id: 202,
      name: 'Grilled Chicken Salad',
      type: 'Lunch',
      calories: 380,
      protein: 42,
      carbs: 20,
      fat: 10,
      imageUrl: '/images/meals/chicken-salad.jpg'
    },
    {
      id: 203,
      name: 'Salmon with Vegetables',
      type: 'Dinner',
      calories: 520,
      protein: 45,
      carbs: 30,
      fat: 25,
      imageUrl: '/images/meals/salmon.jpg'
    }
  ];
  
  export const mockGoals = [
    {
      id: 301,
      title: 'Lose 5kg',
      description: 'Reach target weight of 75kg',
      category: 'weight',
      targetValue: 75,
      currentValue: 79.5,
      startValue: 82.5,
      progress: 60,
      status: 'active',
      deadline: '2023-08-31'
    },
    {
      id: 302,
      title: 'Bench Press 100kg',
      description: 'Increase strength for 1 rep max',
      category: 'strength',
      targetValue: 100,
      currentValue: 90,
      startValue: 85,
      progress: 33,
      status: 'active',
      deadline: '2023-09-30'
    },
    {
      id: 303,
      title: 'Run 5km under 25 minutes',
      description: 'Improve cardiovascular fitness',
      category: 'cardio',
      targetValue: 25,
      currentValue: 27.5,
      startValue: 30,
      progress: 50,
      status: 'active',
      deadline: '2023-08-15'
    }
  ];
  