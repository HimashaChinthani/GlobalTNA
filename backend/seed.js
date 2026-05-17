require('dotenv').config();
const mongoose = require('mongoose');
const JobRequest = require('./models/JobRequest');

const seedJobs = [
  {
    title: 'Leaking pipe under kitchen sink',
    description: 'There is a severe leak under the sink that needs fixing immediately. Water is everywhere.',
    category: 'Plumbing',
    location: '123 Main St, Springfield',
    contactName: 'John Doe',
    contactEmail: 'john.doe@example.com',
    status: 'Open'
  },
  {
    title: 'Rewire master bedroom',
    description: 'Looking to add 4 new outlets and a ceiling fan in the master bedroom.',
    category: 'Electrical',
    location: '456 Elm St, Springfield',
    contactName: 'Jane Smith',
    contactEmail: 'jane.smith@example.com',
    status: 'In Progress'
  },
  {
    title: 'Install new water heater',
    description: 'Old water heater broke down. Need a new 50-gallon tank installed.',
    category: 'Plumbing',
    location: '789 Oak Ave, Springfield',
    contactName: 'Bob Johnson',
    contactEmail: 'bob.j@example.com',
    status: 'Open'
  },
  {
    title: 'Fix broken window pane',
    description: 'Front living room window was broken by a baseball. Need replacement glass.',
    category: 'Carpentry',
    location: '321 Pine Rd, Springfield',
    contactName: 'Alice Williams',
    contactEmail: 'alice.w@example.com',
    status: 'Closed'
  },
  {
    title: 'Outdoor lighting installation',
    description: 'Install 6 pathway lights and 2 security lights in the backyard.',
    category: 'Electrical',
    location: '654 Maple Dr, Springfield',
    contactName: 'Charlie Brown',
    contactEmail: 'charlie.b@example.com',
    status: 'Open'
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await JobRequest.deleteMany({});
    console.log('Cleared existing job requests');

    await JobRequest.insertMany(seedJobs);
    console.log('Successfully inserted seed jobs');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
