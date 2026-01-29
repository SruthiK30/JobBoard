import { Router, Response } from 'express';
import { JobRepository } from '../infrastructure/JobRepository';
import {
  CreateJobUseCase,
  GetJobUseCase,
  GetAllJobsUseCase,
  UpdateJobUseCase,
  DeleteJobUseCase,
} from '../application/JobUseCases';
import { adminMiddleware } from './middleware'; // ❗ Only adminMiddleware is imported now

const router = Router();
const repository = new JobRepository();

const createJobUseCase = new CreateJobUseCase(repository);
const getJobUseCase = new GetJobUseCase(repository);
const getAllJobsUseCase = new GetAllJobsUseCase(repository);
const updateJobUseCase = new UpdateJobUseCase(repository);
const deleteJobUseCase = new DeleteJobUseCase(repository);

// GET /api/jobs - Get all jobs with pagination
router.get('/jobs', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(
      100,
      Math.max(1, parseInt(req.query.limit as string) || 10)
    );

    const result = await getAllJobsUseCase.execute(page, limit);
    res.json({
      data: result.data.map((job) => job.toPrimitives()),
      page: result.page,
      limit: result.limit,
      total: result.total,
      hasMore: result.hasMore,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(400).json({ error: message });
  }
});

// GET /api/jobs/:id - Get a single job
router.get('/jobs/:id', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const job = await getJobUseCase.execute(req.params.id);

    if (!job) {
      res.status(404).json({ error: 'Job not found' });
      return;
    }

    res.json(job.toPrimitives());
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(400).json({ error: message });
  }
});

// POST /api/jobs - Create a new job (Admin only)
router.post(
  '/jobs',
  adminMiddleware,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { title, description } = req.body;

      if (!title || !description) {
        res.status(400).json({ error: 'Title and description are required' });
        return;
      }

      const job = await createJobUseCase.execute(
        title,
        description,
        req.userId || 'admin'
      );

      res.status(201).json(job.toPrimitives());
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      res.status(400).json({ error: message });
    }
  }
);

// PUT /api/jobs/:id - Update a job (Admin only)
router.put(
  '/jobs/:id',
  adminMiddleware,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { title, description } = req.body;

      if (!title || !description) {
        res.status(400).json({ error: 'Title and description are required' });
        return;
      }

      const job = await updateJobUseCase.execute(
        req.params.id,
        title,
        description
      );

      if (!job) {
        res.status(404).json({ error: 'Job not found' });
        return;
      }

      res.json(job.toPrimitives());
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      res.status(400).json({ error: message });
    }
  }
);

// DELETE /api/jobs/:id - Delete a job (Admin only)
router.delete(
  '/jobs/:id',
  adminMiddleware,
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const success = await deleteJobUseCase.execute(req.params.id);

      if (!success) {
        res.status(404).json({ error: 'Job not found' });
        return;
      }

      res.status(204).send();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      res.status(400).json({ error: message });
    }
  }
);

export default router;
