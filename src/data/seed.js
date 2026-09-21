function toISODate(date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export const DEFAULT_CARE_TASKS = [
  { id: "morning-meal", title: "Morning meal", time: "8:00 AM", type: "meal", completed: true },
  { id: "afternoon-walk", title: "Afternoon walk", time: "2:00 PM", type: "walk", completed: false },
  { id: "evening-meal", title: "Evening meal", time: "6:00 PM", type: "meal", completed: false },
];

export const DEFAULT_PLANNER_ACTIVITIES = [
  { id: 1, time: "8:00", period: "AM", title: "Morning meal", detail: "Breakfast • 1 cup", type: "meal", completed: true },
  { id: 2, time: "10:30", period: "AM", title: "Morning walk", detail: "30 min walk", type: "walk", completed: false },
  { id: 3, time: "1:00", period: "PM", title: "Medicine", detail: "Vitamin supplement", type: "medicine", completed: false },
  { id: 4, time: "3:30", period: "PM", title: "Play time", detail: "Ball & toys • 20 min", type: "play", completed: false },
  { id: 5, time: "6:00", period: "PM", title: "Evening meal", detail: "Dinner • 1 cup", type: "meal", completed: false },
];

export function createInitialAppState(now = new Date()) {
  return {
    version: 2,
    onboarding: { completed: false, profileCompleted: false },
    pet: {
      id: "buddy",
      name: "Buddy",
      breed: "Golden Puppy",
      ageLabel: "2 Years",
      ageDescription: "2 years old",
      birthdayISO: "2024-03-24",
      birthday: "March 24, 2024",
      gender: "Male",
      favoriteFood: "Chicken & rice",
      activityLevel: "High energy",
      activityLabel: "High",
      weightKg: 12.4,
      microchipId: "984 123 456 789",
      microchipStatus: "Registered",
      primaryVet: "Happy Paws Clinic",
      diet: "Standard adult diet",
      insurance: "Active",
    },
    home: {
      moodId: "happy",
      careTasks: DEFAULT_CARE_TASKS.map((task) => ({ ...task })),
    },
    planner: {
      selectedDate: toISODate(now),
      activities: DEFAULT_PLANNER_ACTIVITIES.map((activity) => ({ ...activity })),
    },
    health: {
      steps: 7240,
      sleepLabel: "8h 20m",
      dailyGoalsCompleted: 3,
      dailyGoalsTotal: 4,
      weightTrend: {
        valueKg: 12.4,
        summary: "Stable this month",
        labels: ["Sep 1", "Sep 8", "Sep 15", "Sep 22", "Sep 29"],
        points: [[10, 60], [55, 67], [100, 58], [145, 64], [190, 53], [235, 61], [290, 65]],
      },
      nextVetVisit: {
        dateLabel: "OCT 12",
        title: "Annual check-up",
        time: "10:30 AM",
        clinic: "Happy Paws Clinic",
      },
      vaccination: {
        status: "Up to date",
        detail: "Next booster: Jan 2027",
      },
      medication: {
        title: "Daily vitamin",
        detail: "1 tablet • 1:00 PM",
      },
      dailyActivity: {
        currentMinutes: 42,
        goalMinutes: 60,
      },
    },
  };
}
