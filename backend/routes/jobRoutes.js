const express = require('express');
const router = express.Router();
const JobRequest = require('../models/JobRequest');

// GET /api/jobs - List with optional filters [cite: 26]
router.get('/', async (req, res, next) => {
  try {
    const { category, status } = req.query;
    let query = {};
    if (category) query.category = category;
    if (status) query.status = status;
    
    const jobs = await JobRequest.find(query).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) { next(err); }
});

// GET /api/jobs/:id - Single job [cite: 27]
router.get('/:id', async (req, res, next) => {
  try {
    const job = await JobRequest.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (err) { next(err); }
});

// POST /api/jobs - Create [cite: 28]
router.post('/', async (req, res, next) => {
  try {
    const newJob = new JobRequest(req.body);
    await newJob.save();
    res.status(201).json(newJob);
  } catch (err) { next(err); }
});

// PATCH /api/jobs/:id - Update status ONLY [cite: 29]
router.patch('/:id', async (req, res, next) => {
  try {
    const updatedJob = await JobRequest.findByIdAndUpdate(
      req.params.id, 
      { status: req.body.status }, 
      { new: true, runValidators: true }
    );
    if (!updatedJob) return res.status(404).json({ message: 'Job not found' });
    res.json(updatedJob);
  } catch (err) { next(err); }
});

// DELETE /api/jobs/:id - Delete [cite: 30]
router.delete('/:id', async (req, res, next) => {
  try {
    const job = await JobRequest.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json({ message: 'Job deleted' });
  } catch (err) { next(err); }
});

module.exports = router;