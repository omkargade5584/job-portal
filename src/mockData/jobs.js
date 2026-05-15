export const initialJobs = [
  {
    id: '1',
    title: 'Senior React Developer',
    company: 'TechFlow Corp',
    location: 'Remote',
    type: 'Full-Time',
    salary: '$120,000 - $150,000',
    description: 'Looking for an experienced React developer to lead our frontend team.',
    employerId: 'emp_123', // So we know which employer posted it
    postedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Frontend Engineer (Vite, React)',
    company: 'Innovate Labs',
    location: 'New York, NY',
    type: 'Contract',
    salary: '$80/hr',
    description: 'Fast-paced startup needs a React expert to refactor an old Create React App to Vite.',
    employerId: 'emp_456',
    postedAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
  },
  {
    id: '3',
    title: 'Junior Web Developer',
    company: 'StartUp Inc',
    location: 'San Francisco, CA',
    type: 'Full-Time',
    salary: '$80,000 - $95,000',
    description: 'Great opportunity for a junior dev! Must know HTML, CSS, JavaScript, and React basics.',
    employerId: 'emp_123',
    postedAt: new Date(Date.now() - 172800000).toISOString() // 2 days ago
  }
];
