import { Job } from '../domain/Job';
import { JobRepository } from '../infrastructure/JobRepository';
import { PaginatedResult } from '../domain/Pagination';

export class CreateJobUseCase {
  constructor(private repository: JobRepository) {}

  async execute(
    title: string,
    description: string,
    postedBy: string
  ): Promise<Job> {
    if (!title || !description || !postedBy) {
      throw new Error('Title, description, and postedBy are required');
    }

    const job = Job.create(title, description, postedBy);
    return this.repository.create(job);
  }
}

export class GetJobUseCase {
  constructor(private repository: JobRepository) {}

  async execute(id: string): Promise<Job | null> {
    if (!id) {
      throw new Error('Job ID is required');
    }
    return this.repository.findById(id);
  }
}

export class GetAllJobsUseCase {
  constructor(private repository: JobRepository) {}

  async execute(page: number, limit: number): Promise<PaginatedResult<Job>> {
    return this.repository.findAll(page, limit);
  }
}

export class UpdateJobUseCase {
  constructor(private repository: JobRepository) {}

  async execute(
    id: string,
    title: string,
    description: string
  ): Promise<Job | null> {
    if (!id) {
      throw new Error('Job ID is required');
    }

    const existingJob = await this.repository.findById(id);
    if (!existingJob) {
      return null;
    }

    existingJob.update(title, description);
    return this.repository.update(id, existingJob);
  }
}

export class DeleteJobUseCase {
  constructor(private repository: JobRepository) {}

  async execute(id: string): Promise<boolean> {
    if (!id) {
      throw new Error('Job ID is required');
    }
    return this.repository.delete(id);
  }
}
