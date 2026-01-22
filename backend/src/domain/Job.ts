import { v4 as uuidv4 } from 'uuid';

export type Role = 'user' | 'admin';

export interface JobProps {
  id: string;
  title: string;
  description: string;
  postedBy: string;
  datePosted: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class Job {
  private props: JobProps;

  constructor(props: JobProps) {
    this.props = props;
  }

  static create(
    title: string,
    description: string,
    postedBy: string
  ): Job {
    return new Job({
      id: uuidv4(),
      title,
      description,
      postedBy,
      datePosted: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  getId(): string {
    return this.props.id;
  }

  getTitle(): string {
    return this.props.title;
  }

  getDescription(): string {
    return this.props.description;
  }

  getPostedBy(): string {
    return this.props.postedBy;
  }

  getDatePosted(): Date {
    return this.props.datePosted;
  }

  getCreatedAt(): Date {
    return this.props.createdAt;
  }

  getUpdatedAt(): Date {
    return this.props.updatedAt;
  }

  update(title: string, description: string): void {
    this.props.title = title;
    this.props.description = description;
    this.props.updatedAt = new Date();
  }

  toPrimitives() {
    return {
      id: this.props.id,
      title: this.props.title,
      description: this.props.description,
      postedBy: this.props.postedBy,
      datePosted: this.props.datePosted,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    };
  }
}
