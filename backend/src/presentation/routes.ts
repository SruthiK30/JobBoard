import { Router, Request, Response } from 'express';
import { JobRepository } from '../infrastructure/JobRepository';

import {
  CreateJobUseCase,
  GetJobUseCase,
  GetAllJobsUseCase,
  UpdateJobUseCase,
  DeleteJobUseCase,
} from '../application/JobUseCases';
import { adminMiddleware } from './middleware';

const router = Router();
console.log('✅ jobRoutes loaded');

const repository = new JobRepository();

const createJobUseCase = new CreateJobUseCase(repository);
const getJobUseCase = new GetJobUseCase(repository);
const getAllJobsUseCase = new GetAllJobsUseCase(repository);
const updateJobUseCase = new UpdateJobUseCase(repository);
const deleteJobUseCase = new DeleteJobUseCase(repository);

/* =========================
   GET /api/jobs
   ========================= */
router.get('/', async (req: Request, res: Response) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 10));

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

/* =========================
   GET /api/jobs/:id
   ========================= */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const job = await getJobUseCase.execute(req.params.id);

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json(job.toPrimitives());
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(400).json({ error: message });
  }
});

/* =========================
   POST /api/jobs (ADMIN)
   ========================= */
router.post('/', adminMiddleware, async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
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
});

/* =========================
   PUT /api/jobs/:id (ADMIN)
   ========================= */
router.put('/:id', adminMiddleware, async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    const job = await updateJobUseCase.execute(
      req.params.id,
      title,
      description
    );

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json(job.toPrimitives());
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(400).json({ error: message });
  }
});

/* =========================
   DELETE /api/jobs/:id (ADMIN)
   ========================= */
router.delete('/:id', adminMiddleware, async (req: Request, res: Response) => {
  try {
    const success = await deleteJobUseCase.execute(req.params.id);

    if (!success) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.status(204).send();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    res.status(400).json({ error: message });
  }
});

export default router;
