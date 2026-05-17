const express = require('express');
const request = require('supertest');
const jobRoutes = require('../routes/jobRoutes');
const authRoutes = require('../routes/authRoutes');
const JobRequest = require('../models/JobRequest');
const jwt = require('jsonwebtoken');

// Mock Mongoose model methods
jest.mock('../models/JobRequest', () => {
  return {
    find: jest.fn(),
    create: jest.fn(),
    deleteMany: jest.fn(),
  };
});

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

describe('Job Routes API', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/jobs', () => {
    it('should return all jobs', async () => {
      const mockJobs = [{ title: 'Test Job 1', category: 'Plumbing' }];
      
      // Setup mock implementation for sort
      const mockSort = jest.fn().mockResolvedValue(mockJobs);
      JobRequest.find.mockReturnValue({ sort: mockSort });

      const res = await request(app).get('/api/jobs');
      
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body[0].title).toBe('Test Job 1');
      expect(JobRequest.find).toHaveBeenCalledWith({});
    });

    it('should return jobs matching search query', async () => {
      const mockJobs = [{ title: 'Fix leak', category: 'Plumbing' }];
      
      const mockSort = jest.fn().mockResolvedValue(mockJobs);
      JobRequest.find.mockReturnValue({ sort: mockSort });

      const res = await request(app).get('/api/jobs?search=leak');
      
      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body[0].title).toBe('Fix leak');
      expect(JobRequest.find).toHaveBeenCalledWith({
        $or: [
          { title: { $regex: 'leak', $options: 'i' } },
          { description: { $regex: 'leak', $options: 'i' } }
        ]
      });
    });
  });

  describe('POST /api/jobs', () => {
    it('should return 401 Unauthorized if no token provided', async () => {
      const res = await request(app)
        .post('/api/jobs')
        .send({
          title: 'New Job',
          description: 'New Desc',
          category: 'Plumbing',
          location: 'Loc',
          contactEmail: 'test@test.com'
        });
      
      expect(res.statusCode).toBe(401);
    });
  });
});
