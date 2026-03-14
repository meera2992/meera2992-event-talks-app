
const fs = require('fs');

const talks = [
  {
    "title": "The Future of JavaScript Frameworks",
    "speakers": ["Jane Doe"],
    "category": ["JavaScript", "Web Development"],
    "duration": 60,
    "description": "An in-depth look at the trends and future of popular JavaScript frameworks like React, Vue, and Angular."
  },
  {
    "title": "Building Scalable APIs with GraphQL",
    "speakers": ["John Smith"],
    "category": ["API", "GraphQL", "Backend"],
    "duration": 60,
    "description": "Learn how to design and build scalable and efficient APIs using GraphQL."
  },
  {
    "title": "AI-Powered User Experiences",
    "speakers": ["Emily White", "David Green"],
    "category": ["AI", "UX", "Design"],
    "duration": 60,
    "description": "Discover how to leverage artificial intelligence to create personalized and engaging user experiences."
  },
  {
    "title": "The Rise of Serverless Computing",
    "speakers": ["Michael Brown"],
    "category": ["Serverless", "Cloud", "Architecture"],
    "duration": 60,
    "description": "A comprehensive guide to serverless architecture and its impact on modern application development."
  },
  {
    "title": "Cybersecurity in the Age of IoT",
    "speakers": ["Sarah Jones"],
    "category": ["Cybersecurity", "IoT", "Security"],
    "duration": 60,
    "description": "Exploring the security challenges and best practices for securing Internet of Things devices."
  },
  {
    "title": "Quantum Computing: The Next Frontier",
    "speakers": ["Peter Williams", "Maria Garcia"],
    "category": ["Quantum Computing", "Science", "Technology"],
    "duration": 60,
    "description": "An introduction to the principles of quantum computing and its potential to revolutionize the tech industry."
  }
];

const schedule = [];
let currentTime = new Date();
currentTime.setHours(10, 0, 0, 0);

for (let i = 0; i < talks.length; i++) {
  const talk = talks[i];
  const startTime = new Date(currentTime);
  const endTime = new Date(currentTime.getTime() + talk.duration * 60000);

  schedule.push({
    ...talk,
    startTime: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    endTime: endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });

  currentTime = new Date(endTime.getTime() + 10 * 60000); // 10-minute break

  if (i === 2) { // Lunch break after the 3rd talk
    const lunchStartTime = new Date(currentTime);
    const lunchEndTime = new Date(currentTime.getTime() + 60 * 60000);
    schedule.push({
      title: "Lunch Break",
      speakers: [],
      category: [],
      duration: 60,
      description: "Enjoy a delicious lunch and network with fellow attendees.",
      startTime: lunchStartTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      endTime: lunchEndTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    currentTime = lunchEndTime;
  }
}

fs.writeFileSync('event-website/public/talks.json', JSON.stringify(schedule, null, 2));

console.log('talks.json has been generated in the public directory.');
