declare global {
  namespace Express {
    interface Request {
      userId?: string;
      userRole?: string;

      pagination?: {
        page: number;
        limit: number;
      };
    }
  }
}

export {};
