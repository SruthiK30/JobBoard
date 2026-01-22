import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Job } from '../domain/Job';
import { PaginatedResult, PaginationService } from '../domain/Pagination';

interface JobDocument extends Document<string> {
  _id: string;
  title: string;
  description: string;
  postedBy: string;
  datePosted: Date;
  createdAt: Date;
  updatedAt: Date;
}

const jobSchema = new Schema<JobDocument>(
  {
    _id: {
      type: String,
      default: uuidv4,
    },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    postedBy: { type: String, required: true, trim: true },
    datePosted: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Index for faster pagination
jobSchema.index({ datePosted: -1 });

const JobModel = mongoose.model<JobDocument>('Job', jobSchema);

export class JobRepository {
  async create(job: Job): Promise<Job> {
    const jobData = job.toPrimitives();
    const doc = await JobModel.create(jobData);

    return new Job({
      id: doc._id,
      title: doc.title,
      description: doc.description,
      postedBy: doc.postedBy,
      datePosted: doc.datePosted,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  async findById(id: string): Promise<Job | null> {
    const doc = await JobModel.findById(id);
    if (!doc) return null;

    return new Job({
      id: doc._id,
      title: doc.title,
      description: doc.description,
      postedBy: doc.postedBy,
      datePosted: doc.datePosted,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  async findAll(page: number, limit: number): Promise<PaginatedResult<Job>> {
    PaginationService.validate(page, limit);

    const skip = PaginationService.calculateSkip(page, limit);
    const [docs, total] = await Promise.all([
      JobModel.find().skip(skip).limit(limit).sort({ datePosted: -1 }),
      JobModel.countDocuments(),
    ]);

    const jobs = docs.map(
      (doc) =>
        new Job({
          id: doc._id,
          title: doc.title,
          description: doc.description,
          postedBy: doc.postedBy,
          datePosted: doc.datePosted,
          createdAt: doc.createdAt,
          updatedAt: doc.updatedAt,
        })
    );

    return PaginationService.createPaginatedResult(jobs, page, limit, total);
  }

  async update(id: string, job: Job): Promise<Job | null> {
    const jobData = job.toPrimitives();

    const doc = await JobModel.findByIdAndUpdate(
      id,
      {
        title: jobData.title,
        description: jobData.description,
        postedBy: jobData.postedBy,
      },
      { new: true, runValidators: true }
    );

    if (!doc) return null;

    return new Job({
      id: doc._id,
      title: doc.title,
      description: doc.description,
      postedBy: doc.postedBy,
      datePosted: doc.datePosted,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    });
  }

  async delete(id: string): Promise<boolean> {
    const result = await JobModel.findByIdAndDelete(id);
    return result !== null;
  }

  async deleteAll(): Promise<void> {
    await JobModel.deleteMany({});
  }
}
