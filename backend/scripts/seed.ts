import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Job } from '../src/domain/Job';
import { JobRepository } from '../src/infrastructure/JobRepository';
import { Database } from '../src/infrastructure/Database';

dotenv.config();

const sampleJobs = [
  {
    title: 'Senior React Developer',
    description: 'We are looking for an experienced React developer with 5+ years of experience. You will be working on cutting-edge web applications and leading a team of junior developers.',
    postedBy: 'HR Team',
  },
  {
    title: 'Full Stack JavaScript Engineer',
    description: 'Join our team as a Full Stack engineer! We use Node.js, Express, React, and MongoDB. Strong TypeScript skills required. Competitive salary and benefits.',
    postedBy: 'Tech Lead',
  },
  {
    title: 'Backend Engineer - Python',
    description: 'Seeking a skilled Python developer for our backend team. Experience with Django/FastAPI is preferred. Work on scalable microservices and cloud infrastructure.',
    postedBy: 'Engineering Manager',
  },
  {
    title: 'UI/UX Designer',
    description: 'Create beautiful and intuitive user interfaces. Proficiency in Figma, Adobe XD, or similar tools. Experience with design systems and accessibility standards.',
    postedBy: 'Design Lead',
  },
  {
    title: 'DevOps Engineer',
    description: 'Manage and optimize our cloud infrastructure on AWS/GCP. Experience with Docker, Kubernetes, CI/CD pipelines. Help us scale to millions of users.',
    postedBy: 'Infrastructure Team',
  },
  {
    title: 'Mobile App Developer - React Native',
    description: 'Build cross-platform mobile applications using React Native. Experience with iOS and Android development. Work with millions of users worldwide.',
    postedBy: 'Mobile Lead',
  },
  {
    title: 'Data Scientist',
    description: 'Apply machine learning to real-world problems. Experience with Python, TensorFlow, and data analysis. Work with big data and build predictive models.',
    postedBy: 'AI Team',
  },
  {
    title: 'QA Automation Engineer',
    description: 'Design and implement automated test frameworks. Experience with Selenium, Jest, or similar tools. Ensure product quality and reliability.',
    postedBy: 'QA Lead',
  },
  {
    title: 'Cloud Architect',
    description: 'Design scalable cloud solutions for enterprise clients. Expertise in AWS, Azure, or GCP. 7+ years of experience required. Excellent package offered.',
    postedBy: 'CTO',
  },
  {
    title: 'Junior Developer Internship',
    description: 'Great opportunity for recent graduates! Learn modern web development practices. Mentorship from senior developers. Potential for conversion to full-time role.',
    postedBy: 'HR',
  },
  {
    title: 'Database Administrator',
    description: 'Manage and optimize our MongoDB and PostgreSQL databases. Monitor performance, handle backups, and security. Experience with database replication and sharding.',
    postedBy: 'Database Team',
  },
  {
    title: 'Technical Writer',
    description: 'Create comprehensive technical documentation. Experience with API documentation and developer guides. Strong communication skills required.',
    postedBy: 'Documentation Team',
  },
];

async function seedDatabase() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/job-board';
    await Database.connect(MONGODB_URI);

    const repository = new JobRepository();

    // Clear existing jobs
    console.log('🗑️  Clearing existing jobs...');
    await repository.deleteAll();

    // Add sample jobs
    console.log('📝 Adding sample jobs...');
    for (const jobData of sampleJobs) {
      const job = Job.create(jobData.title, jobData.description, jobData.postedBy);
      await repository.create(job);
      console.log(`✓ Created: ${job.getTitle()}`);
    }

    console.log(`\n✅ Successfully seeded ${sampleJobs.length} jobs!`);
    await Database.disconnect();
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
