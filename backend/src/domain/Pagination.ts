export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResult<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

export class PaginationService {
  static validate(page: number, limit: number): void {
    if (page < 1) throw new Error('Page must be greater than 0');
    if (limit < 1) throw new Error('Limit must be greater than 0');
    if (limit > 100) throw new Error('Limit cannot exceed 100');
  }

  static calculateSkip(page: number, limit: number): number {
    return (page - 1) * limit;
  }

  static createPaginatedResult<T>(
    data: T[],
    page: number,
    limit: number,
    total: number
  ): PaginatedResult<T> {
    return {
      data,
      page,
      limit,
      total,
      hasMore: page * limit < total,
    };
  }
}
